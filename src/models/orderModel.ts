import mongoose, { Document } from "mongoose";
import Item from "./itemModel";

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  discountCode: String,
});

interface OrderDocument extends Document {
  items: Item[];
  discountCode?: string;
}

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
