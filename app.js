import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";

export const app = express();
// configuring environment
config({path: "./config.env"});

// use middleware
app.use(express.json());
app.use(cookieParser())

// all the routes
app.use("/api/v1/users", userRouter);
