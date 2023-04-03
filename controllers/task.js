import { Task } from "../Model/task.js";

const getMyTasks = async (req, res) => {
    const userId = req.user._id;
    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json({
            success: true,
            data: tasks,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    const document = {
        title,
        description,
        user,
    };
    try {
        const response = await Task.create(document);
        res.status(201).json({
            success: true,
            message: "task added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: true,
            error,
        });
    }
};
const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const query = { _id: taskId };
    try {
        const task = await Task.findById(query);
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "task is updated successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        });
    }
};
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const query = { _id: taskId };
    try {
        await Task.deleteOne(query);
        res.status(200).json({
            success: true,
            message: "task is deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error,
        });
    }
};

export { getMyTasks, createTask, updateTask, deleteTask };
