import Order from "../models/order.js";
import Cart from "../models/cart.js";

// Lấy tất cả các orders và thêm danh sách sản phẩm trong cart vào listProduct
const getAllOrders = async (req, res) => {
    try {
        // Lấy tất cả các orders và populate cart và user
        const orders = await Order.find()
            .populate("user", "email name") // Populate user để lấy thông tin cơ bản
            .populate("cart"); // Populate cart để lấy thông tin cart

        // Duyệt qua từng order để bổ sung danh sách sản phẩm từ cart
        const enrichedOrders = await Promise.all(
            orders.map(async (order) => {
                if (!order.cart) {
                    return { ...order.toObject(), listProduct: [] }; // Nếu không có cart, trả về danh sách trống
                }

                // Populate productId trong items của cart
                const populatedCart = await Cart.findById(order.cart._id).populate(
                    "items.productId",
                    "nameProduct price imageUrl"
                );

                // Kiểm tra nếu cart không có items
                if (!populatedCart || !populatedCart.items) {
                    return { ...order.toObject(), listProduct: [] };
                }

                // Tạo listProduct từ các sản phẩm trong cart
                const listProduct = populatedCart.items.map((item) => {
                    if (!item.productId) return null; // Nếu productId không tồn tại
                    return {
                        productId: item.productId._id,
                        nameProduct: item.productId.nameProduct,
                        price: item.productId.price,
                        imageUrl: item.productId.imageUrl,
                        quantity: item.quantity,
                        size: item.size,
                    };
                }).filter(Boolean); // Lọc bỏ các giá trị null

                return {
                    ...order.toObject(), // Giữ lại dữ liệu của order
                    listProduct, // Thêm danh sách sản phẩm từ cart
                };
            })
        );

        res.status(200).json(enrichedOrders); // Trả về danh sách orders với listProduct
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching orders with product details" });
    }
};

export default {
    getAllOrders,
};
