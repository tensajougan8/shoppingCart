import mongoose, { Document } from 'mongoose';
const discountSchema = new mongoose.Schema({
    code: String,
    percentage: Number,
});

export interface DiscountDocument extends Document {
    code: String,
    percentage: number,
}

const Discount = mongoose.model<DiscountDocument>('Discount', discountSchema);

export default Discount;