import express from "express";
import {
    register,
    login,
    getUserProfile,
    logout,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/user").get(isAuthenticated, getUserProfile);

export default router;
