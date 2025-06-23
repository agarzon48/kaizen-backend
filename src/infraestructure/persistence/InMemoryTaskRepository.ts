import { Task } from "../../domain/tasks/Task";
import { TaskRepository } from "../../domain/tasks/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks = new Map<string, Task>();

    save = async (task: Task): Promise<Task> => {
        try {
            this.tasks.set(task.id, task);
            return task;
        } catch (error) {
            throw new Error(`Error saving task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    findAll = async (): Promise<Task[]> => {
        try {
            return Array.from(this.tasks.values());
        } catch (error) {
            throw new Error(`Error retrieving all tasks: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    findById = async (id: string): Promise<Task | null> => {
        try {
            return this.tasks.get(id) || null;
        } catch (error) {
            throw new Error(`Error finding task by ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    update = async (task: Task): Promise<Task> => {
        try {
            if (!this.tasks.has(task.id)) {
                throw new Error(`Task with ID ${task.id} does not exist`);
            }
            this.tasks.set(task.id, task);
            return task;
        } catch (error) {
            throw new Error(`Error updating task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    deleteById = async (id: string): Promise<boolean> => {
        try {
            if (!this.tasks.has(id)) {
                throw new Error(`Task with ID ${id} does not exist`);
            }
            this.tasks.delete(id);
            return true;
        } catch (error) {
            throw new Error(`Error deleting task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}   