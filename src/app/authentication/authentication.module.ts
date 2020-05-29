import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Component
import { LoginComponent } from './login/login.component';

// Service
import { UserService } from '../store/service/user.service';
import { AuthenticationService } from '../store/service/authentication.service';
import { UserTasksService } from '../store/service/user-tasks-service';
import { AlertService } from '../store/service/alert.service';




@NgModule({
  declarations:
    [
      LoginComponent
    ],
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,    
    ],
  exports:
    [
      LoginComponent,
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
