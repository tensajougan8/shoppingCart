import mongoose, { Document } from 'mongoose';

const cartSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    totalItems: Number,
    totalPrice: Number,
  });

 export interface CartDocument extends Document {
    items: [mongoose.Types.ObjectId];
    totalItems?: number;
    totalPrice: number,
  }
  
  const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
  
  export default Cart;
  