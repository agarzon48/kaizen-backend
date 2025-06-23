import { Task } from './Task';

export interface TaskRepository {
    save(task: Task): Promise<Task>;
    findById(id: string): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    update(task: Task): Promise<Task>;
    deleteById(id: string): Promise<boolean>;
}