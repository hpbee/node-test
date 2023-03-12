import SearchPersonsDto from "../search-persons.dto";
import Person, { IPerson } from "../models/person.model";

export class PersonsRepository extends Person {
    async create(dto: IPerson){
        return Person.create(dto);
    }
    async searchPersons(searchPersonsDto: SearchPersonsDto) {
        return null;
    }
}
export default new PersonsRepository();