interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    completed: boolean;
    dueDate: String;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { Task };