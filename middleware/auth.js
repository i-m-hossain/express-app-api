import { User } from "../Model/user.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Login first",
        });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const query = { _id: decodedData._id };
    req.user = await User.findById(query);
    next()
};
