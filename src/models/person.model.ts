import mongoose, { Schema } from "mongoose";

export class IPerson {
    personId: string;
    gender: string;
    dob: string; // YYYY-MM-DD
    dod: string; // YYYY-MM-DD
    name: {
        first: string,
        middle: string,
        last: string,
    };
    addresses: Residence[];
}

class Residence {
    from: string; // YYYY-MM-DD
    to: string; // YYYY-MM-DD, will be empty for current address
    addressId: string;
}
const ResidenceSchema = new Schema<Residence>({
    from: { type: String, required: true, index: true }, // YYYY-MM-DD
    to: { type: String, index: true }, // YYYY-MM-DD, will be empty for current address
    addressId: { type: String, required: true },
})

export const PersonSchema = new Schema<IPerson>({
    personId: { type: String, unique: true },
    gender: { type: String },
    dob: { type: String }, // YYYY-MM-DD
    dod: { type: String }, // YYYY-MM-DD
    name: {
        first: { type: String },
        middle: { type: String },
        last: { type: String },
    },
    addresses: { type: [ResidenceSchema] }
});

const PersonsModel = mongoose.model<IPerson>('Person', PersonSchema);
export default PersonsModel;