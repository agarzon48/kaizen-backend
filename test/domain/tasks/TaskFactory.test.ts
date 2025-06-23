import { test } from "node:test";
import assert from 'node:assert';

import { TaskFactory } from "../../../src/domain/tasks/TaskFactory";

test('TaskFactory: when create is called, it returns a Task with the provided title and description', () => {
    const factory = new TaskFactory();
    const task = factory.create('Test Task', 'This is a test task');

    assert.strictEqual(task.title, 'Test Task');
    assert.strictEqual(task.description, 'This is a test task');
    assert.ok(task.id); // id should be generated
});