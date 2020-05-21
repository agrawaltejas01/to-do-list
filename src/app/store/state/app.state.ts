import { taskSchema } from '../schema/userTasks-schema';

export interface AppState
{
    readonly task : taskSchema[];
}