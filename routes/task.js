import express from "express";
const router = express.Router();
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

router.route("/all").get(isAuthenticated, getMyTasks);
router.route("/create").post(isAuthenticated, createTask);
router
  .route("/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
export default router;
