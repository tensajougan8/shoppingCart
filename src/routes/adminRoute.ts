import express from "express";
import AdminController from "../controllers/adminController";

const adminRouter = express.Router();
const adminController = new AdminController();

adminRouter.get('/generate-code', adminController.generateDiscountCode.bind(adminController));
adminRouter.get('/user/:id', adminController.getUserInformation.bind(adminController));

export default adminRouter;