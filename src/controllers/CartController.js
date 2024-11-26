import Cart from "../models/cart.js";
import Product from "../models/product.js";

// 1. Add Item to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity, size } = req.body;

        // Tìm sản phẩm trong cơ sở dữ liệu
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Tìm kích thước trong danh sách kích thước sản phẩm
        const sizeItem = product.listSize.find((item) => item.size === size);
        if (!sizeItem) {
            return res.status(400).json({ message: `Size '${size}' is not available for this product` });
        }

        // Kiểm tra số lượng còn lại trong kho
        if (sizeItem.quantity < quantity) {
            return res.status(400).json({
                message: `Not enough stock for size '${size}'. Available quantity: ${sizeItem.quantity}`,
            });
        }

        // Tìm giỏ hàng của người dùng
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Tính tổng số lượng sản phẩm hiện có trong giỏ hàng
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId && item.size === size
        );

        let totalQuantityInCart = 0;
        if (existingItemIndex >= 0) {
            totalQuantityInCart = cart.items[existingItemIndex].quantity;
        }

        // Kiểm tra nếu thêm vào giỏ hàng vượt quá số lượng tồn kho
        const newTotalQuantity = totalQuantityInCart + quantity;
        if (newTotalQuantity > sizeItem.quantity) {
            return res.status(400).json({
                message: `Not enough stock for size '${size}'. Maximum available: ${sizeItem.quantity - totalQuantityInCart}`,
            });
        }

        // Thêm hoặc cập nhật sản phẩm trong giỏ hàng
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, size });
        }

        // Tính lại tổng tiền
        cart.totalAmount = await calculateTotalAmount(cart.items);
        await cart.save();

        // Populate thông tin sản phẩm để trả về đầy đủ thông tin
        const populatedCart = await cart.populate("items.productId", "imageUrl nameProduct price");
        res.status(200).json(populatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
};


// 2. Remove Item from Cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId, size } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => !(item.productId.toString() === productId && item.size === size)
        );

        cart.totalAmount = await calculateTotalAmount(cart.items);
        await cart.save();

        const populatedCart = await cart.populate("items.productId", "imageUrl nameProduct price");
        res.status(200).json(populatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
};


// 3. View Cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ user: userId }).populate(
            "items.productId",
            "imageUrl nameProduct price"
        );
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching cart" });
    }
};


// 4. Clear Cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error clearing cart" });
    }
};
const calculateTotalAmount = async (items) => {
    let totalAmount = 0;
    for (const item of items) {
        const product = await Product.findById(item.productId);
        totalAmount += item.quantity * product.price;
    }
    return totalAmount;
};

export default {
    addToCart,
    removeFromCart,
    clearCart, getCart
}