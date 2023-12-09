import mongoose, { Document } from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  totalPrice: Number,
  discountCode: String,
  discountedPrice: Number,
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

interface OrderDocument extends Document {
  items: [mongoose.Types.ObjectId];
  discountCode?: string;
  totalPrice: number;
  discountedPrice: number;
  userID: mongoose.Types.ObjectId;
}

const Order = mongoose.model<OrderDocument>("Order", orderSchema);

export default Order;
