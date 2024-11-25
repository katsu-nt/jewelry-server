import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: { type: String, required: true }
})
const User = mongoose.model("Product", productSchema)
export default User;