import express from "express";
import {
    getAllUsers,
    register,
    login,
    getUserDetails,
    updateUserDetails,
    deleteUser,
} from "../controllers/user.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/all").get(getAllUsers);
router
    .route("/:userId")
    .get(getUserDetails)
    .put(updateUserDetails)
    .delete(deleteUser);

export default router;
