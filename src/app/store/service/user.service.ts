import { Injectable } from '@angular/core';
import {  HttpClientModule, HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { userSchema } from '../schema/user-schema' 
import { userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
  providedIn: 'root'
})

export class UserService
{
    baseUrl : String;

    constructor(private http : HttpClient)
    {
        this.baseUrl = "http://localhost:8080/";
    }

    findUser(username)
    {
        return this.http.post<userSchema>(this.baseUrl + 'findUser', {
            username
        })
    }

    getUserTasks(username)
    {
        return this.http.post<userTasksSchema>(this.baseUrl + 'getUserTasks', {
            username
        })
    }

    addUserTask(userTaskBody)
    {
        return this.http.post<boolean>(this.baseUrl + 'addUserTask',
            userTaskBody
        )
    }
}