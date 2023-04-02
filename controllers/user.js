import { User } from "../Model/user.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res) => {
    const { keyword, category, page } = req.query;
    const query = {};
    const users = await User.find(query);
    res.status(200).json({ success: true, users });
};
const getSingleUser = async (req, res) => {
    const { userId } = req.params;
    const query = { _id: userId };
    const user = await User.findById(query);
    res.status(200).json({ success: true, user });
};
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

export { getAllUsers, getSingleUser, createNewUser };
