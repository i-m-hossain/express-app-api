import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js";

export const app = express();
// configuring environment
config({path: "./config.env"});

// use middleware
app.use(express.json());

// all the routes
app.use("/api/v1/users", userRouter);
