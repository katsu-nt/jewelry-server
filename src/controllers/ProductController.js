import Product from "../models/product.js";
import cloudinary from "cloudinary"


const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${base64Image}`
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI)
    return uploadResponse.url
}
const insertProduct = async (req, res) => {
    try {
        const imageUrl = await uploadImage(req.file)
        const newProduct = new Product(req.body)
        newProduct.imageUrl = imageUrl
        await newProduct.save()
        res.status(200).json(newProduct.toObject())
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error inserting product" })
    }
}

const updateProduct = async (req, res) => {
    try {
        // Lấy ID sản phẩm từ URL
        const { id } = req.params;

        // Tìm sản phẩm trong cơ sở dữ liệu
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Cập nhật thông tin từ req.body
        Object.keys(req.body).forEach((key) => {
            product[key] = req.body[key];
        });

        // Xử lý file ảnh mới (nếu có)
        if (req.file) {
            const imageUrl = await uploadImage(req.file); // Hàm xử lý upload ảnh
            product.imageUrl = imageUrl;
        }

        // Lưu sản phẩm đã cập nhật
        await product.save();

        res.status(200).json(product.toObject());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Lấy toàn bộ sản phẩm từ cơ sở dữ liệu
        res.status(200).json(products); // Trả về danh sách sản phẩm dưới dạng JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        // Lấy ID sản phẩm từ URL
        const { id } = req.params;

        // Tìm và xóa sản phẩm trong cơ sở dữ liệu
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};

export default {
    insertProduct,
    updateProduct,
    getAllProducts,
    deleteProduct,
}