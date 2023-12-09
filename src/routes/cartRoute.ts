import express from "express";
import CartController from "../controllers/cartController";
import CheckoutController from "../controllers/checkoutController";

const cartRouter = express.Router();
const cartController = new CartController();
const checkoutController = new CheckoutController();

cartRouter.patch('/', cartController.addToCart.bind(cartController));
cartRouter.post('/checkout', checkoutController.checkout.bind(checkoutController));

export default cartRouter;