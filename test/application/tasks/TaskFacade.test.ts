import { test } from "node:test";
import assert from 'node:assert';

import { TaskFactory } from "../../../src/domain/tasks/TaskFactory";
import { InMemoryTaskRepository } from "../../../src/infrastructure/persistence/InMemoryTaskRepository";
import { TaskFacade } from "../../../src/application/tasks/TaskFacade";

test('TaskFacade: should create a task and retrieve it', async () => {
    const factory = new TaskFactory();
    const repository = new InMemoryTaskRepository();
    const facade = new TaskFacade(factory, repository);

    // Create a task
    const createdTask = await facade.createTask('Test Task', 'This is a test task');

    assert.ok(createdTask.id, 'Task should have an ID');
    assert.strictEqual(createdTask.title, 'Test Task');
    assert.strictEqual(createdTask.description, 'This is a test task');

    // Retrieve the task by ID
    const retrievedTask = await facade.getTaskById(createdTask.id);

    assert.deepStrictEqual(retrievedTask, createdTask, 'Retrieved task should match created task');
});

test('TaskFacade: should update a task', async () => {
    const factory = new TaskFactory();
    const repository = new InMemoryTaskRepository();
    const facade = new TaskFacade(factory, repository);

    // Create a task
    const createdTask = await facade.createTask('Test Task', 'This is a test task');

    // Update the task
    const updatedTask = await facade.updateTask(createdTask.id, 'Updated Task', 'This is an updated test task');

    assert.strictEqual(updatedTask.title, 'Updated Task');
    assert.strictEqual(updatedTask.description, 'This is an updated test task');
});

test('TaskFacade: should delete a task', async () => {
    const factory = new TaskFactory();
    const repository = new InMemoryTaskRepository();
    const facade = new TaskFacade(factory, repository);

    // Create a task
    const createdTask = await facade.createTask('Test Task', 'This is a test task');

    // Delete the task
    const deleted = await facade.deleteTask(createdTask.id);

    assert.strictEqual(deleted, true, 'Task should be deleted successfully');

    // Try to retrieve the deleted task
    const retrievedTask = await facade.getTaskById(createdTask.id);
    assert.strictEqual(retrievedTask, null, 'Deleted task should not be retrievable');
});