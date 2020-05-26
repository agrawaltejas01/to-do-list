import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class UserTasksService
{
    username: string = 'Tejas';
    userTasks: userTasksSchema = null;
    userTasksLabelList: string[] = [];

    getTaskLabel()
    {
        this.userTasks.task.forEach((element) =>
        {
            if (this.userTasksLabelList.indexOf(element.label) === -1)
                this.userTasksLabelList.push(element.label);
        });
    }

    changeTaskStatus(id: string, status: number)
    {
        this.userTasks.task.forEach(task =>
        {
            if (task._id == id)
                task.status = status;
        })
    }

    changeTaskPriority(id: string, priority: number)
    {
        this.userTasks.task.forEach(task =>
        {
            if (task._id == id)
                task.priority = priority;
        })
    }

    archiveTask(idToBeArchived: string[])
    {
        this.userTasks.task.forEach(task =>
        {
            if (idToBeArchived.indexOf(task._id) > -1)
            {
                task.archive = !task.archive;
            }
        })
    }

    deleteTask(idToBeDeleted: string[])
    {
        for (let index = 0; index < this.userTasks.task.length; index++) 
        {
            if (idToBeDeleted.indexOf(this.userTasks.task[index]._id) > -1)
            {
                this.userTasks.task.splice(index, 1);
                index--;
            }

        }
    }

    addTask(task: taskSchema)
    {
        this.userTasks.task.push(task);
    }
}