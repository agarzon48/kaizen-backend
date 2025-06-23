import express from "express";
import { TaskFactory } from "../../domain/tasks/TaskFactory";
import { TaskFacade } from "../../application/tasks/TaskFacade";
import { InMemoryTaskRepository } from "../persistence/InMemoryTaskRepository";
import { TaskController } from "./TaskController";

const router = express.Router();

const taskFactory = new TaskFactory();
const taskRepository = new InMemoryTaskRepository();
const taskFacade = new TaskFacade(taskFactory, taskRepository);
const taskController = new TaskController(taskFacade);

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getAllTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;