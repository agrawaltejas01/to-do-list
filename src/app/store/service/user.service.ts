import { Injectable } from '@angular/core';
import {  HttpClientModule, HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { userSchema } from '../schema/user-schema' 

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
}