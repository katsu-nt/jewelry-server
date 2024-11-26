import Product from "../models/product.js";

const insertProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(200).json(newProduct.toObject())
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error inserting product" })
    }
}
export default {
    insertProduct
}