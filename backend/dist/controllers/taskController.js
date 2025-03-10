"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const errorHandler_1 = require("../middlewares/errorHandler");
// GET
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // get from token
    if (!userId) {
        throw new errorHandler_1.AppError('User not authenticated', 401);
    }
    try {
        const tasks = yield Task_1.default.find({ userId }).sort({ createdAt: 1 });
        res.status(200).json(tasks);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Error fetching tasks', 500);
    }
});
exports.getTasks = getTasks;
// GET: Obtener una tarea específica por ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params; // ID de la tarea
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // ID del usuario desde el token
    if (!userId) {
        throw new errorHandler_1.AppError('User not authenticated', 401);
    }
    try {
        // Busca la tarea asegurándose de que pertenezca al usuario
        const task = yield Task_1.default.findOne({ _id: id, userId });
        if (!task) {
            throw new errorHandler_1.AppError('Task not found or unauthorized', 404);
        }
        res.status(200).json(task);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Error fetching task', 500);
    }
});
exports.getTaskById = getTaskById;
// POST
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title } = req.body;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // auth0 user
    if (!userId) {
        throw new errorHandler_1.AppError('User not authenticated', 401);
    }
    if (!title) {
        throw new errorHandler_1.AppError('Title is required', 400);
    }
    try {
        const newTask = new Task_1.default({
            title,
            completed: false,
            userId,
        });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Error creating task', 500);
    }
});
exports.createTask = createTask;
// DELETE
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // auth0 user
    if (!userId) {
        throw new errorHandler_1.AppError('User not authenticated', 401);
    }
    try {
        // try to find task
        const task = yield Task_1.default.findOne({ _id: id, userId });
        if (!task) {
            // if task doesnt exist or doesnt belong to user
            throw new errorHandler_1.AppError('Task not found or unauthorized', 404);
        }
        yield task.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        throw new errorHandler_1.AppError('Error deleting task', 500);
    }
});
exports.deleteTask = deleteTask;
// PATCH: update the title and/or status of a task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params; // ID of the task to update
    const { title, completed } = req.body; // new title and/or completed status
    const userId = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.sub; // obtain ID of user from token
    // Check if user was found
    if (!userId) {
        throw new errorHandler_1.AppError('User not authenticated', 401);
    }
    // Check if at least one field (title or completed) is provided
    if (title === undefined && completed === undefined) {
        res.status(400).json({ message: 'At least one field (title or completed) is required' });
        return;
    }
    try {
        // Create an object with the fields to update
        const updateFields = {};
        if (title !== undefined) {
            updateFields.title = title;
        }
        if (completed !== undefined) {
            updateFields.completed = completed;
        }
        // Find and update the task
        const updatedTask = yield Task_1.default.findOneAndUpdate({ _id: id, userId }, // Ensure the task belongs to the user
        updateFields, // Update the provided fields
        { new: true } // Return the updated task
        );
        // If task is not found or unauthorized
        if (!updatedTask) {
            throw new errorHandler_1.AppError('Task not found or unauthorized', 404);
        }
        // Return the updated task
        res.status(200).json(updatedTask);
    }
    catch (error) {
        throw new errorHandler_1.AppError('Error updating task', 500);
    }
});
exports.updateTask = updateTask;
