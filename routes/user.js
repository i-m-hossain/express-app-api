import express from "express";
import {
    getAllUsers,
    createNewUser,
    getUserDetails,
    updateUserDetails,
    deleteUser,
} from "../controllers/user.js";
const router = express.Router();

// create new user  --post request
router.route("/new").post(createNewUser);

// get all the users --get request
router.route("/all").get(getAllUsers);

// get single user details --get request
// update user details
// delete user
router
    .route("/:userId")
    .get(getUserDetails)
    .put(updateUserDetails)
    .delete(deleteUser);

export default router;
