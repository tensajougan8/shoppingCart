import express from "express";
import CheckoutController from "../controllers/checkoutController";

const checkoutRouter = express.Router();
const checkoutController = new CheckoutController();

checkoutRouter.post('/checkout', checkoutController.checkout.bind(checkoutController));

export default checkoutRouter;