import express from "express";
import MyOrderController from "../controllers/MyOrderController.js";

const router = express.Router();

// /api/my/order
// Route lấy toàn bộ order
router.get("/allOrders", MyOrderController.getAllOrders);
export default router