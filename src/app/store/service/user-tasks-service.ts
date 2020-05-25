import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class UserTasksService
{
    userTasks: userTasksSchema = null;

    changeTaskStatus(id : string)
    {
        this.userTasks.task.forEach(task =>
            {
                if(task._id == id)
                    task.status = (task.status + 1) % 3;
            })
    }

    changeTaskPriority(id : string)
    {
        this.userTasks.task.forEach(task =>
            {
                if(task._id == id)
                {
                    if(task.priority != 3)
                        task.priority = task.priority + 1;
                    
                    else task.priority = 1;
                }
            })
    }

    archiveTask(idToBeArchived : string[])
    {
        this.userTasks.task.forEach(task =>
            {
                if(idToBeArchived.indexOf(task._id) > -1)
                {
                    task.archive = !task.archive;
                }
            })
    }

    deleteTask(idToBeDeleted : string[])
    {
        for (let index = 0; index < this.userTasks.task.length; index++) 
        {
            if(idToBeDeleted.indexOf(this.userTasks.task[index]._id) > -1)
            {
                this.userTasks.task.splice(index, 1);
                index--;
            }
            
        }
    }

    addTask(task : taskSchema)
    {
        this.userTasks.task.push(task);        
    }
}