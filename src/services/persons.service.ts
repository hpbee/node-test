import SearchPersonsDto from "../search-persons.dto";
import personsRepository, { PersonsRepository } from "../providers/persons.repository";
import { IPerson } from "../models/person.model";


export class PersonsService {

    constructor() {  }
    async searchPersons(searchPersonsDto: SearchPersonsDto) {
        return personsRepository.searchPersons(searchPersonsDto);
    }

    async create(dto: IPerson) {
        return personsRepository.create(dto);
    }
}
export const personsService = new PersonsService();