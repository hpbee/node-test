import { StatusEnum } from "./enums/status.enum"

type SearchPersonsDto = {
    from: string,
    to: string,
    status: StatusEnum | '@any',
    addressIds: string[],
    zipCodes: string[]
}
export default SearchPersonsDto;