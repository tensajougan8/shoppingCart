import { Request, Response, NextFunction } from "express";
import Item from "../models/itemModel";
import Order from "../models/orderModel";
import Discount, { DiscountDocument } from "../models/discountModel";

export default class CheckoutController {
  checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userID = req.body.id;
      const itemIds = req.body.itemIds;
      const discountCode = req.body.discountCode;

      const items = await Item.find({ _id: { $in: itemIds } });
      const isValidDiscount = await this.validateDiscountCode(discountCode);
      if (!isValidDiscount) {
        res.status(400).json({ message: "Invalid discount code" });
        return;
      }
      const isUsedCode = await this.checkIfCodeUsed(discountCode, userID);
      console.log(isUsedCode);
      if (isUsedCode) {
        res.status(400).json({ message: "Code is already used" });
        return;
      }
      const totalPrice = items.reduce((total, item) => total + item.price, 0);
      const percentage = await this.discountPercent(discountCode);
      const discount = totalPrice * percentage;
      const discountedPrice = isValidDiscount
        ? totalPrice - discount
        : totalPrice;

      const order = await Order.create({
        userID,
        items,
        discountCode,
        totalPrice,
        discountedPrice,
      });

      res.status(200).json({ order, totalPrice, discountedPrice });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  validateDiscountCode = async (discountCode: string): Promise<boolean> => {
    const discount = await Discount.find({ code: discountCode });
    if (!discount) {
      return false;
    }
    return true;
  };

  async discountPercent(discountCode: string): Promise<number> {
    const discount = await Discount.find<DiscountDocument>({
      code: discountCode,
    });
    const number = discount[0]!.percentage / 100;
    return number;
  }

  checkIfCodeUsed = async (
    discountCode: string,
    userID: string
  ): Promise<boolean> => {
    const order = await Order.find({
      userID,
      discountCode: { $exists: true, $ne: null },
    });
    console.log(order);
    if (order.length === 0) {
      return false;
    }
    return true;
  };
}
