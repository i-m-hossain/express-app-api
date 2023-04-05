// import libs
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//import modules
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

// app
export const app = express();
// configuring environment
config({ path: "./config.env" });

// use middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Content-Type", "application/json;charset=UTF-8");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// all the routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// test api
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

// error middleware

app.use((err, req, res, next) => {
  return res.status(404).json({
    success: false,
    message: err.message,
  });
});
