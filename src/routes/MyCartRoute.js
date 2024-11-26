import express from "express";
import MyCartController from "../controllers/MyCartController.js";

const router = express.Router();

// /api/my/cart
router.put("/add", MyCartController.addToCart)
router.get("/:userId", MyCartController.getCart)
router.delete("/remove", MyCartController.removeFromCart)
router.delete("/clear", MyCartController.clearCart)
export default router