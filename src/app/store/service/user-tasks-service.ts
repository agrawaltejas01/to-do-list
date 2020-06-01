import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class UserTasksService
{
    username: string = "Tejas";


    // username: string = null;
    userTasks: userTasksSchema = null;
    userTasksLabelList = {};

    setUserName(currentUserName: string)
    {
        this.username = currentUserName;
    }

    getTaskLabel()
    {
        this.userTasks.task.forEach((element) =>
        {
            this.addTaskLabel(element)
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
        let labelWillBeDeleted: Boolean = false;
        for (let index = 0; index < this.userTasks.task.length; index++) 
        {
            if (idToBeDeleted.indexOf(this.userTasks.task[index]._id) > -1)
            {
                // If there is even one label that will be deleted, labelWillBeDeleted will be always be true
                labelWillBeDeleted =
                    labelWillBeDeleted ? true : this.checkUnusedLabel(this.userTasks.task[index].label);
                this.userTasks.task.splice(index, 1);
                index--;
            }

        }
        return labelWillBeDeleted;
    }

    addTask(task: taskSchema)
    {
        this.userTasks.task.push(task);
        this.addTaskLabel(task);
    }

    addTaskLabel(task: taskSchema)
    {
        if (task.label in this.userTasksLabelList)
            this.userTasksLabelList[task.label] = this.userTasksLabelList[task.label] + 1;

        else
            this.userTasksLabelList[task.label] = 1;
    }

    checkUnusedLabel(label: string)
    {
        if (this.userTasksLabelList[label] == 1)
        {
            delete this.userTasksLabelList[label];
            return true;
        }
    }
}