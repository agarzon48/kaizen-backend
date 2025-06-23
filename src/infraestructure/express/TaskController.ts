import { Request, Response } from 'express';
import { TaskFacade } from '../../application/tasks/TaskFacade';

export class TaskController {
    constructor(private taskFacade: TaskFacade) { }

    private handleError(res: Response, error: unknown): void {
        let message = 'Internal Server Error';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(500).json({ error: message });
    }

    private handleNotFound(res: Response, id: string): void {
        res.status(404).json({ error: `Task with id ${id} not found` });
    }

    private validateTitle(req: Request, res: Response): boolean {
        const { title } = req.body;
        if (!title || typeof title !== 'string' || title.trim() === '') {
            res.status(400).json({ error: 'Title is required' });
            return false;
        }
        return true;
    }

    private validateId(req: Request, res: Response): boolean {
        const { id } = req.params;
        if (!id || typeof id !== 'string' || id.trim() === '') {
            res.status(400).json({ error: 'Task ID is required' });
            return false;
        }
        return true;
    }

    createTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const titleIsValid = this.validateTitle(req, res)
            if (!titleIsValid) return;

            const { title, description } = req.body;

            const task = await this.taskFacade.createTask(title, description);
            res.status(201).json(task);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    getAllTasks = async (_req: Request, res: Response): Promise<void> => {
        try {
            const tasks = await this.taskFacade.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    getTaskById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const task = await this.taskFacade.getTaskById(id);

            if (!task) return this.handleNotFound(res, id);

            res.status(200).json(task);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    updateTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const titleIsValid = this.validateTitle(req, res);
            if (!titleIsValid) return;

            const idIsValid = this.validateId(req, res);
            if (!idIsValid) return;

            const { id } = req.params;
            const { title, description } = req.body;

            const updatedTask = await this.taskFacade.updateTask(id, title, description);
            res.status(200).json(updatedTask);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    deleteTask = async (req: Request, res: Response): Promise<void> => {
        try {
            const idIsValid = this.validateId(req, res);
            if (!idIsValid) return;

            const { id } = req.params;
            const deleted = await this.taskFacade.deleteTask(id);

            if (!deleted) return this.handleNotFound(res, id);

            res.status(204).send();
        } catch (error) {
            this.handleError(res, error);
        }
    }
}