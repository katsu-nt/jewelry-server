import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import bodyParser from "body-parser"
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to db")
}).catch((e) => {
    console.log("Error from connection of App to DB: " + e)
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get("/health",  (req, res) => {
    res.send({ message: "health OK!" })
})
app.listen(7000, () => {

})