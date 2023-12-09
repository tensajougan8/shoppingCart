// controllers/adminController.ts
import { Request, Response, NextFunction } from "express";
import Order from "../models/orderModel";
import Discount from "../models/discountModel";
import mongoose from "mongoose";
export default class AdminController {
  generateDiscountCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { percent } = req.body;
    try {
      const nthOrder = await Order.countDocuments({});
      if (nthOrder >= 0 && nthOrder % 5 === 0) {
        const discountCode = this.generateCode();
        const newDiscount = new Discount({
          code: discountCode,
          percentage: percent || 10,
        });
        await newDiscount.save();
        res.status(200).json({ discountCode });
      } else {
        res.status(403).json({
          message: "Condition not satisfied for discount code generation.",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  getUserInformation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userID = req.params.id;
    try {
      const ordersSummary = await Order.aggregate([
        {
          $match: {
            userID: new mongoose.Types.ObjectId(userID), // Match documents for the specified userID
          },
        },
        {
          $group: {
            _id: null,
            totalItemsPurchased: { $sum: { $size: "$items" } }, // Count of items purchased
            totalPurchaseAmount: { $sum: "$totalPrice" }, // Total purchase amount
            discountCodes: { $addToSet: "$discountCode" }, // List of unique discount codes
            totalDiscountAmount: { $sum: "$discountedPrice" }, // Total discount amount
          },
        },
      ]);

      if (ordersSummary.length > 0) {
        res.status(200).json(ordersSummary[0]);
      } else {
        res.status(404).json({
          message: "No orders found for this user",
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  generateCode = (): string => {
    return `DISCOUNT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  };
}
