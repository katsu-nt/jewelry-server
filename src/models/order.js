import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  cart:{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  status: {
    type: String,
    enum: ["Đã đặt", "Đang vận chuyển", "Giao hàng thành công"],
    default: "Đã đặt"
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;