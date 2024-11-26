import mongoose from "mongoose";
const sizeItem = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
const productSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true,
    },
    nameProduct: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    typeProduct: { type: String, required: true },
    gender: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    listSize:[sizeItem]
})
const User = mongoose.model("Product", productSchema)
export default User;