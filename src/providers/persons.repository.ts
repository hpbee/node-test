import SearchPersonsDto from "../search-persons.dto";
import PersonsModel, { IPerson } from "../models/person.model";
import AddressModel from "../models/address.model";
import { StatusEnum } from "../enums/status.enum";

export class PersonsRepository extends PersonsModel {
    private personsModel = PersonsModel;
    private addressModel = AddressModel;
    async create(dto: IPerson) {
        return PersonsModel.create(dto);
    }

    async searchPersons(searchPersonsDto: SearchPersonsDto) {
        const { from, to, zipCodes, status } = searchPersonsDto;
        let { addressIds } = searchPersonsDto;

        if (zipCodes?.length > 0) {
            addressIds = await this.getAddressIdsByZipCodes(zipCodes);
        }
        const matchPipeline: any = {
            $match: {
                $and: [
                    { "addresses.from": { $gte: from } },
                    { "addresses.to": { $lte: to } },
                    { "addresses.addressId": { $in: addressIds } }
                ]
            }
        };
        if (status === StatusEnum.Alive) {
            matchPipeline.$match.$and.push({ dod: { $in: [null, ""] } });
        } else if (status === StatusEnum.Dead) {
            matchPipeline.$match.$and.push({ dod: { $nin: [null, ""] } });
        }
        return this.personsModel.aggregate([
            matchPipeline,

            {
                $unwind: "$addresses",
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "addresses.addressId",
                    foreignField: "addressId",
                    as: "addressDetails",
                },
            },
            {
                $set: {
                    addresses: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ["$addressDetails", 0],
                            },
                            "$addresses",
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: {
                        personId: "$personId",
                        firstName: "$name.first",
                        lastName: "$name.last",
                        dob: "$dob",
                        dod: "$dod",
                    },
                    addresses: {
                        $push: {
                            addressId: "$addresses.addressId",
                            zipCode: "$addresses.zipCode",
                            street: "$addresses.street",
                            isCurrent: {
                                $cond: {
                                    if: {
                                        $in: ["$addresses.to", [null, '']],
                                    },
                                    then: true,
                                    else: false,
                                },
                            },
                        },
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: { $mergeObjects: ["$_id", "$$ROOT"] },
                },
            },
            {
                $project: {
                    personId: 1,
                    firstName: 1,
                    lastName: 1,
                    age: {
                        $floor: {
                            $divide: [
                                {
                                    $subtract: [new Date(), { $toDate: "$dob" }],
                                },
                                1000 * 60 * 60 * 24 * 365,
                            ],
                        },
                    },
                    isAlive: {
                        $cond: {
                            if: {
                                $in: ["$dod", [null, ""]],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    addresses: 1,
                    isCurrent: 1,
                    _id: 0,
                },
            }
        ]);
    }


    private async getAddressIdsByZipCodes(zipCodes: string[]): Promise<string[]> {
        const addressIdsRes = await this.addressModel.aggregate<{ addressIds: string[]; }>([
            {
                $match: {
                    zipCode: { $in: zipCodes }
                }
            },
            {
                $group: {
                    _id: null,
                    addressIds: { $addToSet: "$addressId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    addressIds: 1,
                    zipCodes: 0
                }
            }
        ]);
        return addressIdsRes[0]?.addressIds ?? [];
    }
}
export default new PersonsRepository();