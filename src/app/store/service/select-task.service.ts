import { Injectable } from '@angular/core';
import { taskSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class SelectTaskService
{
    taskSelected : Boolean[] = [false];
    appTaskList : taskSchema[] = [];

    unSelectAllTask()
    {
        this.taskSelected = [false];
    }

    selectAllTask()
    {
        this.taskSelected = [true];
    }

    insertInAppTaskList(task : taskSchema)
    {
        this.appTaskList.push(task);
    }

    initAppTaskList()
    {
        this.appTaskList = [];
    }

    removeFromAppTaskList(id : string)
    {
        for (let index = 0; index < this.appTaskList.length; index++) 
        {
            if(this.appTaskList[index]._id == id)
            {
                this.appTaskList.splice(index,1);
                return;
            }
            
        }
    }

    // archivetask(id : string)
    // {
    //     for(let index = 0)
    // }
}