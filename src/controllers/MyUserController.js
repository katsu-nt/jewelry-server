import User from "../models/user.js";

const register = async (req,res)=>{
    try {
        const {_id} = req.body
        const existingUser = await User.findOne({_id})
        if(existingUser){
            return res.status(200).send()
        }
        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser.toObject())
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating user" })
    }
}
const login = async (req,res)=>{
    try {
        const {email, password} = req.body
        const existingUser = await User.findOne({email, password})
        if(!existingUser){
            return res.status(403).send()
        }
        res.status(200).json(existingUser.toObject())
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error finding user" })
    }
}
export default {
    register,
    login
}