import mongoose from "mongoose";
const productInfomation = new mongoose.Schema({
    productL: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    size: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
const ProductInfomation = mongoose.model("ProductInfomation", productInfomation)
export default ProductInfomation;