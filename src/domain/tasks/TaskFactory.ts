import { Task } from './Task';
import { randomUUID } from 'crypto';

export class TaskFactory {
    create(title: string, description: string): Task {
        return new Task(randomUUID(), title, description);
    }
}