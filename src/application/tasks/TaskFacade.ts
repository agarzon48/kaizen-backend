import { Task } from "../../domain/tasks/Task";
import { TaskFactory } from "../../domain/tasks/TaskFactory";
import { InMemoryTaskRepository } from "../../infraestructure/persistence/InMemoryTaskRepository";

export class TaskFacade {
    constructor(
        private readonly factory: TaskFactory,
        private readonly repository: InMemoryTaskRepository
    ) { }

    createTask = async (title: string, description: string): Promise<Task> => {
        try {
            const task = this.factory.create(title, description);
            return await this.repository.save(task);
        } catch (error) {
            throw new Error(`Error creating task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    getAllTasks = async (): Promise<Task[]> => {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw new Error(`Error retrieving all tasks: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    getTaskById = async (id: string): Promise<Task | null> => {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw new Error(`Error finding task by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            throw new Error(`Error updating task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    deleteTask = async (id: string): Promise<boolean> => {
        try {
            return await this.repository.deleteById(id);
        } catch (error) {
            throw new Error(`Error deleting task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}