import express from "express";
import ProductController from "../controllers/ProductController.js";
import multer from "multer"

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
}
)

// /api/admin/product
router.post("/insert", upload.single("imageFile"),ProductController.insertProduct)
router.post("/filter", ProductController.filterProducts);
export default router