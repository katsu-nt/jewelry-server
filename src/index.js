import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import myUserRoute from "./routes/MyUserRoute.js"
import productRoute from "./routes/ProductRoute.js"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to db")
}).catch((e) => {
    console.log("Error from connection of App to DB: " + e)
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
  }));
app.get("/health",  (req, res) => {
    res.send({ message: "health OK!" })
})

app.use("/api/my/user", myUserRoute)
app.use("/api/admin/product", productRoute)

app.listen(7000, () => {

})