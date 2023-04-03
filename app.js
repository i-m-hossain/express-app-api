// import libs
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

//import modules
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

// app
export const app = express();
// configuring environment
config({path: "./config.env"});

// use middleware
app.use(express.json());
app.use(cookieParser())

// all the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
