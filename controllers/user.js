import { User } from "../Model/user.js";
import bcrypt from "bcrypt";

const createNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    res.status(201).cookie("temp", "test").json({
        success: true,
        message: "registered successfully",
        user,
    });
};

const getAllUsers = async (req, res) => {
    const { keyword, category, page } = req.query;
    const query = {};
    const users = await User.find(query);
    res.status(200).json({ success: true, users });
};

const getUserDetails = async (req, res) => {
    const { userId } = req.params;
    const query = { _id: userId };
    const user = await User.findById(query);
    res.status(200).json({ success: true, user });
};

const updateUserDetails = async (req, res) => {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        name,
        email,
        password: hashedPassword,
    };
    const filter = { _id: userId };
    const updatedUser = await User.updateOne(filter, user);
    res.status(200).json({
        success: true,
        updatedUser,
    });
};
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const query = { _id: userId };
    const deletedStatus = await User.deleteOne(query);
    res.status(200).json({
        success: true,
        deletedStatus,
    });
};

export {
    createNewUser,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    deleteUser,
};
