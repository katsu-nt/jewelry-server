import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    category: { type: String, required: true }
})
const User = mongoose.model("Product", productSchema)
export default User;