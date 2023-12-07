import mongoose, { Document } from "mongoose";
import Item from "./itemModel";

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  totalPrice: Number,
  discountCode: String,
});

interface OrderDocument extends Document {
  items: [mongoose.Types.ObjectId];
  discountCode?: string;
  totalPrice: number,
}

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
