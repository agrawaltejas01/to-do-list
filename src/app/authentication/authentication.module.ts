import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Component
import { LoginComponent } from './login/login.component';

// Service
import { UserService } from '../store/service/user.service';
import { AuthenticationService } from '../store/service/authentication.service';
import { UserTasksService } from '../store/service/user-tasks-service';
import { AlertService } from '../store/service/alert.service';
import { RegisterationComponent } from './registeration/registeration.component';




@NgModule({
  declarations:
    [
      LoginComponent,
      RegisterationComponent
    ],
  imports:
    [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  exports:
    [
      LoginComponent,
      RegisterationComponent,
    ],

  providers:
    [
      UserTasksService,
      AuthenticationService,
      UserService,
      AlertService
    ]
})
export class AuthenticationModule { }
