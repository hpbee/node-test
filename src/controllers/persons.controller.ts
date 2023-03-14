import { Request, Response } from "express";
import SearchPersonsDto from "../search-persons.dto";
import { personsService } from "../services/persons.service";

class PersonsController {
    constructor() { }
    async searchPersons(req: Request, res: Response) {
        try {
            if (req.query.addressIds) {

                req.query.addressIds = PersonsController.parseQueryParamArray(req.query.addressIds as string);
            }
            if (req.query.zipCodes) {
                req.query.zipCodes = PersonsController.parseQueryParamArray(req.query.zipCodes as string);
            }
            const persons = await personsService.searchPersons(req.query as SearchPersonsDto);
            res.status(200).json(persons);
        } catch (err) {
            console.log((err as Error).message);
            res.status(400).json({ message: (err as Error).message });
        }
    }

    private static parseQueryParamArray(queryParam: string) {
        return queryParam.split(',').map((param) => param.trim());
    }
}
export default new PersonsController();