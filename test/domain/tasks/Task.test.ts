import { test } from "node:test";
import assert from 'node:assert';

import { Task } from "../../../src/domain/tasks/Task";

test('Task: when provided with valid data, constructor set fields properly', () => {
    const now = new Date();
    const task = new Task('1', 'Test Task', 'This is a test task', now);

    assert.strictEqual(task.id, '1');
    assert.strictEqual(task.title, 'Test Task');
    assert.strictEqual(task.description, 'This is a test task');
    assert.strictEqual(task.createdAt, now);
})

test('Task: when title is empty, constructor throws an error', () => {
    assert.throws(() => {
        new Task('1', '', 'This is a test task');
    }, {
        name: 'Error',
        message: 'Title cannot be empty'
    }, 'Expected constructor to throw an error when title is empty');
});