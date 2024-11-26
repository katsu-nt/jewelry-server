import express from "express";
import CartController from "../controllers/CartController.js";

const router = express.Router();

// /api/user/cart
router.put("/add", CartController.addToCart)
router.get("/:userId", CartController.getCart)
router.delete("/remove", CartController.removeFromCart)
router.delete("/clear", CartController.clearCart)
export default router