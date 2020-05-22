import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SelectTaskService
{
    taskSelected : Boolean[] = [false];

    unSelectAllTask()
    {
        this.taskSelected = [false];
    }

    selectAllTask()
    {
        this.taskSelected = [true];
    }
}