import jwt from "jsonwebtoken";

const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //sending response with cookie
    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000, //15 mins
        })
        .json({
            success: true,
            message: message,
        });
};
export { sendCookie };
