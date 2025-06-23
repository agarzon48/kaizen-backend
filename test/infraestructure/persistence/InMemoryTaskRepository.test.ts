import { test } from "node:test";
import assert from 'node:assert';

import { InMemoryTaskRepository } from "../../../src/infraestructure/persistence/InMemoryTaskRepository";

test('InMemoryTaskRepository: should save and retrieve tasks', async () => {
    const repository = new InMemoryTaskRepository();
    const task = { id: '1', title: 'Test Task', description: 'This is a test task', createdAt: new Date() };

    // Save the task
    const savedTask = await repository.save(task);
    assert.strictEqual(savedTask.id, task.id);
    assert.strictEqual(savedTask.title, task.title);
    assert.strictEqual(savedTask.description, task.description);

    // Retrieve all tasks
    const tasks = await repository.findAll();
    assert.strictEqual(tasks.length, 1);
    assert.deepStrictEqual(tasks[0], savedTask);

    // Retrieve by ID
    const foundTask = await repository.findById(task.id);
    assert.deepStrictEqual(foundTask, savedTask);
});

test('InMemoryTaskRepository: should update an existing task', async () => {
    const repository = new InMemoryTaskRepository();
    const task = { id: '1', title: 'Test Task', description: 'This is a test task', createdAt: new Date() };

    // Save the task
    await repository.save(task);

    // Update the task
    const updatedTask = { ...task, title: 'Updated Task' };
    const result = await repository.update(updatedTask);
    assert.strictEqual(result.title, 'Updated Task');

    // Verify the update
    const foundTask = await repository.findById(task.id);
    assert.strictEqual(foundTask?.title, 'Updated Task');
});

test('InMemoryTaskRepository: should delete a task by ID', async () => {
    const repository = new InMemoryTaskRepository();
    const task = { id: '1', title: 'Test Task', description: 'This is a test task', createdAt: new Date() };

    // Save the task
    await repository.save(task);

    // Delete the task
    const deleted = await repository.deleteById(task.id);
    assert.strictEqual(deleted, true);

    // Verify deletion
    const foundTask = await repository.findById(task.id);
    assert.strictEqual(foundTask, null);
});