import mongoose, { Schema } from "mongoose";

export class IAddress{
    addressId: string;
    zipCode: string;
    street: string;
}

export const AddressSchema = new Schema<IAddress>({
    addressId: { type: String, required: true, unique: true, index: true },
    zipCode: { type: String, required: true, index: true},
    street: { type: String, required: true },
});

const AddressModel = mongoose.model<IAddress>('Address', AddressSchema);
export default AddressModel;