import { Request, Response } from 'express';
import Cart, { CartDocument } from '../models/cartModel'; // Import your Cart model here
import Item from '../models/itemModel';
import mongoose from 'mongoose';

export default class CartController {
	addToCart = async (req: Request, res: Response): Promise<void> => {
		const { itemId, cartId } = req.body;
	

		try {
			let cart: CartDocument | null;

			if (cartId === null) {
				cart = new Cart({
					_id: new mongoose.Types.ObjectId(),
					items: [],
					totalItems: 0,
					totalPrice: 0,
				});
			} else {
				cart = await Cart.findById(cartId);
				if (!cart) {
					res.status(404).json({ error: 'Cart not found' });
					return;
				  }
			}
			const item = await Item.findById(itemId);

			if (!item) {
				res.status(404).json({ error: 'Item not found' });
				return;
			}

			// Add item to cart's items array
			cart.items.push(item._id); // Assuming items is an array of ObjectIds

			// Increment totalItems and totalPrice (Assuming you calculate these values)
			cart.totalItems = (cart.totalItems || 0) + 1;
			cart.totalPrice = (cart.totalPrice || 0) + item.price; // Assuming price is a property on your Item model

			await cart.save();

			res.status(200).json({ message: 'Item added to cart successfully', cart });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	};
}
