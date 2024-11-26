import express from "express";
import ProductController from "../controllers/ProductController.js";

const router = express.Router();

// /api/admin/product
router.post("/insert", ProductController.insertProduct)
export default router