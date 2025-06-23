import { Task } from "../../domain/tasks/Task";
import { TaskFactory } from "../../domain/tasks/TaskFactory";
import { InMemoryTaskRepository } from "../../infrastructure/persistence/InMemoryTaskRepository";

export class TaskFacade {
    constructor(
        private readonly factory: TaskFactory,
        private readonly repository: InMemoryTaskRepository
    ) { }

    private handleError(operation: string, error: unknown): never {
        throw new Error(`Error ${operation}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    createTask = async (title: string, description: string): Promise<Task> => {
        try {
            const task = this.factory.create(title, description);
            return await this.repository.save(task);
        } catch (error) {
            this.handleError('creating task', error);
        }
    }

    getAllTasks = async (): Promise<Task[]> => {
        try {
            return await this.repository.findAll();
        } catch (error) {
            this.handleError('retrieving all tasks', error);
        }
    }

    getTaskById = async (id: string): Promise<Task | null> => {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            this.handleError('finding task by ID', error);
        }
    }

    updateTask = async (id: string, title: string, description: string): Promise<Task> => {
        try {
            const task = await this.getTaskById(id);
            if (!task) {
                throw new Error(`Task with id ${id} not found`);
            }

            const taskCopy = structuredClone(task);

            if (title && title.trim() !== '') {
                taskCopy.title = title;
            }
            taskCopy.description = description;

            const updatedTask = await this.repository.update(taskCopy);
            return updatedTask;
        } catch (error) {
            this.handleError('updating task', error);
        }
    }

    deleteTask = async (id: string): Promise<boolean> => {
        try {
            return await this.repository.deleteById(id);
        } catch (error) {
            this.handleError('deleting task', error);
        }
    }
}