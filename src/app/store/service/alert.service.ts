import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AlertService
{
    message: string = null;

    constructor()
    {

    }

    putMessage(message: string)
    {
        this.removeMessage();
        this.message = message;
    }

    removeMessage()
    {
        this.message = null;
    }
}