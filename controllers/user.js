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
    //first check if email exists
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    //compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
        return res.status(404).json({
            success: false,
            message: "Invalid email or password",
        });
    //sending cookie with login
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
};

const logout = (req, res) => {
    // setting cookie null
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "logout success",
        });
};


const getUserProfile = async (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
};


export {
    register,
    login,
    getUserProfile,
    logout,
};
