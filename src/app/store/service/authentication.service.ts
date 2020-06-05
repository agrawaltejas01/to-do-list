import { Injectable } from '@angular/core';

// Service
import { Observable } from 'rxjs';
import { userSchema } from '../schema/user-schema';
import { UserService } from './user.service';
import { UserTasksService } from './user-tasks-service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService
{    

    constructor(
        private userService: UserService,
        private userTasksService: UserTasksService,
        private router: Router,
        private alertService : AlertService )
    {
        // this.currentUser = null;
    }

    login(username: string, password: string)
    {
        this.userService.authenticateUser(username, password).subscribe(result =>
        {
            if (result)
            {
                this.alertService.removeMessage();
                localStorage.setItem('VALID_LOGIN', username);
                this.userTasksService.setUserName(username);
                this.router.navigate(['/'])
            }

            else
            {
                console.log("Error in login");
                this.alertService.putMessage("Invalid Username or password")
                this.router.navigate(['login'])
            }
        });
    }

    register(username: string, password: string)
    {
        this.userService.registerUser(username, password).subscribe(result =>
            {
                if (result)
                {
                    this.alertService.removeMessage();
                    localStorage.setItem('VALID_LOGIN', username);
                    this.userTasksService.setUserName(username);                    
                    this.router.navigate(['/'])
                }
    
                else
                {
                    console.log("Error in resgister");
                    this.alertService.putMessage("Username already exists")
                    this.router.navigate(['register'])
                }
            });
    }

    logout()
    {        
        this.userTasksService.setUserName(null);
        localStorage.removeItem('VALID_LOGIN');
        this.router.navigate(['login'])
    }
}