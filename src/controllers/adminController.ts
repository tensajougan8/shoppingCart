// controllers/adminController.ts
import { Request, Response, NextFunction } from "express";
import Order from "../models/orderModel";

export const generateDiscountCode = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const nthOrder = await Order.countDocuments({});
    if (nthOrder > 0 && nthOrder % 5 === 0) {
      const discountCode = generateCode();
      res.status(200).json({ discountCode });
    } else {
      res
        .status(403)
        .json({
          message: "Condition not satisfied for discount code generation.",
        });
    }
  } catch (error) {
    next(error);
  }
};

const generateCode = (): string => {
  return `DISCOUNT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};
