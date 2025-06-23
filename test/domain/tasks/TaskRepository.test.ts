import { test } from "node:test";
import assert from 'node:assert';

import { TaskRepository } from "../../../src/domain/tasks/TaskRepository";

test('TaskRepository: should have all required methods', () => {
    const repository: TaskRepository = {
        save: async (task) => task,
        findById: async (id) => null,
        findAll: async () => [],
        update: async (task) => task,
        deleteById: async (id) => true
    };

    assert.strictEqual(typeof repository.save, 'function');
    assert.strictEqual(typeof repository.findById, 'function');
    assert.strictEqual(typeof repository.findAll, 'function');
    assert.strictEqual(typeof repository.update, 'function');
    assert.strictEqual(typeof repository.deleteById, 'function');
});