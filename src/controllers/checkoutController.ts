// controllers/checkoutController.ts
import { Request, Response, NextFunction } from 'express';
import Item from '../models/itemModel';
import Order from '../models/orderModel';
import Discount, { DiscountDocument } from '../models/discountModel';

export const checkout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const itemIds = req.body.itemIds;
		const discountCode = req.body.discountCode;

		const items = await Item.find({ _id: { $in: itemIds } });
		const isValidDiscount = await validateDiscountCode(discountCode);
		if (!isValidDiscount) {
			res.status(400).json({ message: 'Invalid discount code' });
      return
		}
		const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const percentage = await discountPercent(discountCode) 
		const discountedPrice = isValidDiscount ? totalPrice * percentage : totalPrice;

		const order = await Order.create({ items, discountCode });

		res.status(200).json({ order, totalPrice, discountedPrice });
	} catch (error) {
		next(error);
	}
};

const validateDiscountCode = async (discountCode: string): Promise<boolean> => {
	const discount = await Discount.find({ code: discountCode });
	if (!discount) {
		return false;
	}
	return true;
};

async function discountPercent(discountCode: string): Promise<number>{
	const discount = await Discount.find<DiscountDocument>({ code: discountCode });
  const number = discount[0]!.percentage/100;
  return number;
}
