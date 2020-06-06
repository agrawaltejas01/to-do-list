import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms'
// Service
import { AuthenticationService } from 'src/app/store/service/authentication.service';
import { AlertService } from 'src/app/store/service/alert.service';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit
{

  registerForm: FormGroup;
  submitted: Boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    public alertService: AlertService) 
  {

  }

  ngOnInit(): void 
  {
    this.resetForm();
  }

  resetForm()
  {
    this.submitted = true;
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
    );
  }

  register()
  {

    if (!this.registerForm.valid)
    {
      if (!this.registerForm.value.username.valid)
      {

        this.alertService.putMessage("Username and Password cannot be empty");
        return;
      }

      if (!this.registerForm.value.password.valid)
      {

        this.alertService.putMessage("Password cannot be empty");
        return;
      }

      if (!this.registerForm.value.confirmPassword.valid)
      {

        this.alertService.putMessage("Password cannot be empty");
        return;
      }

    }
    else if (this.registerForm.value.password != this.registerForm.value.confirmPassword)
    {
      this.alertService.putMessage("Passwords do not match");
      return;
    }

    else
    {
      this.alertService.removeMessage();
      this.authenticationService.register(this.registerForm.value.username, this.registerForm.value.password);
    }
  }
}

export class ConfirmPasswordValidatior
{
  static matchPassword(control: AbstractControl)
  {
    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (password != confirmPassword)
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });

    else
      return null;
  }
}
