export class Task {
    constructor(
        public readonly id: string,
        public title: string,
        public description: string,
        public readonly createdAt: Date = new Date(),
    ) {
        if (!title || title.trim() === '') {
            throw new Error('Title cannot be empty');
        }
    }
}