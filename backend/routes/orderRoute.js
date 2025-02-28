import express from "express";
import {
  placeOrdersStripe,
  placeOrdersRazorpay,
  allOrders,
  updateStatus,
  userOrders,
  placeOrder,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrdersStripe);
orderRouter.post("/razorpay", authUser, placeOrdersRazorpay);

orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
