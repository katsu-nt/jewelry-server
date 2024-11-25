import express from "express";
import MyUserController from "../controllers/MyUserController.js";

const router = express.Router();

// /api/my/user
router.post("/register", MyUserController.register)
router.post("/login", MyUserController.login)
export default router