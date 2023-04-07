import { User } from "../Model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    //check if user already exists
    try {
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User already exist!", 409));

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
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //first check if email exists
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return next(new ErrorHandler("Invalid email or password!", 400));

        //compare password
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched)
            return next(new ErrorHandler("Invalid email or password!", 400));

        //generating jwt and sending cookie
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    // setting cookie null
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "development" ? false : true,
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

export { register, login, getUserProfile, logout };
