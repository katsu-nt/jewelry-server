import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true },
        },
    ],
    totalAmount: { type: Number, default: 0 },
});


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
