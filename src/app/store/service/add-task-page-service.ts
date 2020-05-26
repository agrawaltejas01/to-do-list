import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class AddTaskPageService
{
    private AddTaskPage : Boolean = false;

    getAddTaskPage()
    {
        return this.AddTaskPage;
    }

    toggleAddTaskPage()
    {
        this.AddTaskPage = !this.AddTaskPage;
    }

}