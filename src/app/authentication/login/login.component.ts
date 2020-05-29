import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Service
import { AuthenticationService } from 'src/app/store/service/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/store/service/user.service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';
import { AlertService } from 'src/app/store/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  validLogin: string = "";
  password: string = "12345";
  username: string = "Tejas";
  loginForm : FormGroup;

  constructor(
    private authenticationService: AuthenticationService,    
    private formBuilder : FormBuilder,
    public alertService : AlertService) 
  {

  }

  ngOnInit(): void 
  {
    this.resetForm();
  }

  resetForm()
  {
    this.loginForm = this.formBuilder.group(
      {
        username : ["", Validators.required],
        password : ["", Validators.required]
      }
    );
  }

  
  login()
  {    
    // this.authenticationService.login(this.username, this.password);

    if(!this.loginForm.valid)
    {
      if(! this.loginForm.value.username.valid)
      {
        // alert("Username cannot be empty");
        this.alertService.putMessage("Username and Password cannot be empty");
        return;
      }
      
      if(! this.loginForm.value.password.valid)
      {
        // alert("Password cannot be empty");
        this.alertService.putMessage("Username and Password cannot be empty");
        return;
      }
            
    }

    else
      {        
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password);
      }
  }

  logout()
  {
    this.authenticationService.logout();
  }
}
