import mongoose, { Document } from 'mongoose';

const itemSchema = new mongoose.Schema({
	name: String,
	price: Number,
});

interface ItemDocument extends Document {
	name: string;
	price: number;
}

const Item = mongoose.model<ItemDocument>('Item', itemSchema);

export default Item;
