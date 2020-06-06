import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AddTaskPageService
{
    private AddTaskPage: Boolean = false;

    getAddTaskPage()
    {
        return this.AddTaskPage;
    }

    toggleAddTaskPage()
    {
        this.AddTaskPage = !this.AddTaskPage;
    }

}