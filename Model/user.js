import mongoose from "mongoose";

export const user = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const User = mongoose.model("User", user);
