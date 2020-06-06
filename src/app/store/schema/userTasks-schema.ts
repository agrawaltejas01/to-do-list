export class taskSchema
{
    _id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    label: string;
    archive: Boolean;
    status: number;
}

export class userTasksSchema
{
    _id: string;
    username: string;
    task: taskSchema[];
}