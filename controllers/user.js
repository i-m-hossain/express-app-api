import { User } from "../Model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    //check if user already exists
    let user = await User.findOne({ email });
    if (user)
        return res.status(404).json({
            success: false,
            message: "User already exist",
        });
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating user
    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    // generating json web token
    sendCookie(user, res, "Registered successfully", 201);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
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
    register,
    login,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    deleteUser,
};
