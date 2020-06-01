import { Injectable } from '@angular/core';
import {  HttpClientModule, HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { userSchema } from '../schema/user-schema' 
import { userTasksSchema, taskSchema } from '../schema/userTasks-schema';

@Injectable({
  providedIn: 'root'
})

export class UserService
{
    baseUrl : string;

    constructor(private http : HttpClient)
    {
        this.baseUrl = "http://localhost:8080/";
    }

    authenticateUser(username : string, password : string)
    {
        // return username as string if successful or null
        return this.http.post<Boolean>(this.baseUrl + 'authenticateUser', {
            username,
            password
        })
    }

    registerUser(username : string, password : string)
    {
        // return username as string if successful or null
        return this.http.post<Boolean>(this.baseUrl + 'registerUser', {
            username,
            password
        })
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

    archiveTask(username : string, idToBeArchived : string[])
    {
        return this.http.post<Boolean>(this.baseUrl + 'archiveTask', {
            username,
            idToBeArchived
        })
    }

    deleteTask(username : string, idToBeDeleted : string[])
    {
        // console.log(idToBeDeleted);
        return this.http.post<Boolean>(this.baseUrl + 'deleteTask', {
            username,
            idToBeDeleted
        })
    }
    
    addUserTask(userTaskBody)
    {
        return this.http.post<any>(this.baseUrl + 'addUserTask',
            userTaskBody
        )
    }

    changeTaskStatus(username : string, taskId : string, status : number)
    {
        return this.http.post<Boolean>(this.baseUrl + 'changeTaskStatus', {
            username,
            taskId,
            status
        })
    }

    changeTaskPriority(username : string, taskId : string, priority : number)
    {
        return this.http.post<Boolean>(this.baseUrl + 'changeTaskPriority', {
            username,
            taskId,
            priority
        })
    }

    updateUserTask(userTaskBody)
    {
        console.log("In update user user-service");
        return this.http.post<Boolean>(this.baseUrl + 'updateUserTask',
            userTaskBody
        )
    }
}