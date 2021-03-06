import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class TaskListService
{
    taskList: taskSchema[] = [];

    constructor()
    {
        this.taskList = [];
    }

    init()
    {
        this.taskList = [];
    }

    getTasksOfFilter(title: string, label: string, priority: number, status: number,
        dueDate: Date, archive: Boolean, userTasks: userTasksSchema) 
    {
        this.init();

        // Check if no filter applied
        if (title == 'none' && label == "none" && priority == -1 &&
            status == -1 && dueDate == null && archive == false)
        {
            // this.taskList = userTasks.task;
            userTasks.task.forEach(element => 
            {
                if (!element.archive)
                    this.taskList.push(element);
            });

        }

        // check if archive has to be applied
        else if (title == 'none' && label == "none" && priority == -1
            && status == -1 && dueDate == null && archive == true)
        {
            userTasks.task.forEach(element =>
            {
                if (element.archive == true)
                    this.taskList.push(element);
            })
        }

        // check if title has to be applied
        if (title != "none")
        {
            userTasks.task.forEach(element =>
            {
                if (element.title == title) 
                {
                    this.taskList.push(element);
                }
            })
        }

        // check if label has to be applied
        if (label != "none") 
        {
            // check if title has been applied
            if (this.taskList.length == 0)
            {
                userTasks.task.forEach(element =>
                {
                    if (element.label == label) 
                    {
                        this.taskList.push(element);
                    }
                })
            }

            else if (this.taskList.length > 0) 
            {
                // title has been applied
                // traverse this.taskList
                for (let index = 0; index < this.taskList.length; index++) 
                {
                    if (this.taskList[index].label != label)
                    {
                        this.taskList.splice(index, 1);
                        index--;
                    }

                }

            }
        }

        // check if priority has to be applied
        if (priority != -1)
        {
            // check if label has been applied
            if (this.taskList.length == 0) 
            {
                // label has not been applied
                // traverse userTasks
                userTasks.task.forEach(element =>
                {
                    if (element.priority == priority) 
                    {
                        this.taskList.push(element);
                    }
                })
            }

            else if (this.taskList.length > 0) 
            {
                // label has been applied
                // traverse this.taskList
                for (let index = 0; index < this.taskList.length; index++) 
                {
                    if (this.taskList[index].priority != priority)
                    {
                        this.taskList.splice(index, 1);
                        index--;
                    }

                }

            }
        }

        if (status != -1)
        {
            // check if label pr priority has been applied
            if (this.taskList.length == 0) 
            {
                // label or priority has not been applied
                // traverse userTasks
                userTasks.task.forEach(element =>
                {
                    if (element.status == status) 
                    {
                        this.taskList.push(element);
                    }
                })
            }

            else if (this.taskList.length > 0) 
            {
                // label or priority has been applied
                // traverse this.taskList
                for (let index = 0; index < this.taskList.length; index++) 
                {
                    if (this.taskList[index].status != status)
                    {
                        this.taskList.splice(index, 1);
                        index--;
                    }

                }

            }
        }

        // check if dueDate has to be applied
        if ((dueDate != null))
        {
            let month = new Date(dueDate).getDate()
            let year = new Date(dueDate).getMonth()
            let date = new Date(dueDate).getFullYear()

            // check if label or priority or status has been applied
            if (this.taskList.length == 0) 
            {
                // label or priority or status has not been applied
                // traverse userTasks
                userTasks.task.forEach(element =>
                {
                    if (
                        new Date(element.dueDate).getDate() == month &&
                        new Date(element.dueDate).getMonth() == year &&
                        new Date(element.dueDate).getFullYear() == date
                    ) 
                    {
                        this.taskList.push(element);
                    }
                })
            }

            else if (this.taskList.length > 0) 
            {
                // label or priority or status has been applied
                // traverse this.taskList
                for (let index = 0; index < this.taskList.length; index++) 
                {
                    if (
                        new Date(this.taskList[index].dueDate).getMonth() != year ||
                        new Date(this.taskList[index].dueDate).getFullYear() != date ||
                        new Date(this.taskList[index].dueDate).getDate() != month
                    )
                    {
                        this.taskList.splice(index, 1);
                        index--;
                    }

                }

            }
        }

        if (archive == false)
        {
            // remove archived from this.taskList
            for (let index = 0; index < this.taskList.length; index++) 
            {
                if (this.taskList[index].archive)
                {
                    this.taskList.splice(index, 1);
                    index--;
                }
            }
        }

        if (archive == true)
        {
            // remove non archived from this.taskList
            for (let index = 0; index < this.taskList.length; index++) 
            {
                if (!this.taskList[index].archive)
                {
                    this.taskList.splice(index, 1);
                    index--;
                }
            }
        }

        return this.taskList;

    }
}