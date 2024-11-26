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
export default {
    insertProduct
}