import express from "express";
import AuthController from "../controllers/authController";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/signup', authController.signUp.bind(authController));

export default authRouter;