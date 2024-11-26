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

const filterProducts = async (req, res) => {
    console.log(req.body)
    try {
      const { typeProduct, gender, minPrice, maxPrice, nameProduct } = req.body;
  
      const filters = {};
  
      if (typeProduct) filters.typeProduct = typeProduct;
      if (gender) filters.gender = gender;
      if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
      if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
      if (nameProduct) filters.nameProduct = { $regex: nameProduct, $options: "i" };
  
      console.log(filters)
      const products = await Product.find(filters);
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error filtering products:", error.message);
      res.status(500).json({ message: "Error filtering products" });
    }
  };
  

export default {
    insertProduct,
    filterProducts
}