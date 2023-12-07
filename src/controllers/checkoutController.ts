// controllers/checkoutController.ts
import { Request, Response, NextFunction } from "express";
import Item from "../models/itemModel";
import Order from "../models/orderModel";

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

    const totalPrice = items.reduce((total, item) => total + item.price, 0);
    const discountedPrice = isValidDiscount ? totalPrice * 0.9 : totalPrice;

    const order = await Order.create({ items, discountCode });

    res.status(200).json({ order, totalPrice, discountedPrice });
  } catch (error) {
    next(error);
  }
};

const validateDiscountCode = async (discountCode: string): Promise<boolean> => {
  // Implementation for discount code validation
  return true;
};
