import express from "express";
import {
    getAllUsers,
    createNewUser,
    getSingleUser,
} from "../controllers/user.js";
const router = express.Router();

// get all the users --get request
router.get("/all", getAllUsers);

// get single user --get request
router.get("/:userId", getSingleUser);

// create new user  --post request
router.post("/new", createNewUser);

export default router;
