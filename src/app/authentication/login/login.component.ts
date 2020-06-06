import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Service
import { AuthenticationService } from 'src/app/store/service/authentication.service';
import { AlertService } from 'src/app/store/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{  
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

    if(!this.loginForm.valid)
    {
      if(! this.loginForm.value.username.valid)
      {        
        this.alertService.putMessage("Username and Password cannot be empty");
        return;
      }
      
      if(! this.loginForm.value.password.valid)
      {        
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
