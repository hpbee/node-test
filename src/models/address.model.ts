import mongoose, { Schema } from "mongoose";

export class IAddress{
    addressId: string;
    zipCode: string;
    street: string;
}

export const AddressSchema = new Schema<IAddress>({
    addressId: { type: String, required: true, unique: true },
    zipCode: { type: String, required: true, unique: true },
    street: { type: String, required: true },
});

const Address = mongoose.model<IAddress>('Address', AddressSchema);
export default Address;