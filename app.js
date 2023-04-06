// import libs
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//import modules
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";

// app
export const app = express();
// configuring environment
config({ path: "./config.env" });

// use middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONT_END_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// all the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// test api
app.get("/", (req, res) => {
    res.json({ message: "hello world" });
});

// error middleware
app.use(errorMiddleware);
