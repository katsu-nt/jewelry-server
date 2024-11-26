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
// Route cập nhật sản phẩm
router.put("/update/:id", upload.single("imageFile"), ProductController.updateProduct);
// Route lấy toàn bộ sản phẩm
router.get("/all", ProductController.getAllProducts);
// Route xóa sản phẩm
router.delete("/delete/:id", ProductController.deleteProduct);
export default router