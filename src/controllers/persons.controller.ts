import { Request, Response } from "express";
import SearchPersonsDto from "../search-persons.dto";
import { personsService } from "../services/persons.service";

class PersonsController {
    constructor() { }
    async searchPersons(req: Request, res: Response) {
        const persons = await personsService.searchPersons(req.query as SearchPersonsDto);
        res.status(200).send()
    }
}
export default new PersonsController();