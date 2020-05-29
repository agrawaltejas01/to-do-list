import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { UserService } from '../store/service/user.service';
import { TaskListService } from '../store/service/task-list.service';
import { SelectTaskService } from '../store/service/select-task.service';
import { UserTasksService } from '../store/service/user-tasks-service';

// Component
import { PanelComponent } from './panel/panel.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';

// fontAwsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTaskPageService } from '../store/service/add-task-page-service';
import { AuthenticationService } from '../store/service/authentication.service';
import { AlertService } from '../store/service/alert.service';

@NgModule({
  declarations: 
  [
    PanelComponent,
    TaskListComponent,
    AddTaskComponent,
    SearchTaskComponent,
  ],

  imports: 
  [
    CommonModule,
    HttpClientModule,  
    FontAwesomeModule,  
    FormsModule,
    ReactiveFormsModule
  ],

  exports : 
  [
    PanelComponent,
    TaskListComponent,
    SearchTaskComponent,
  ],

  providers :
  [
    UserService,
    SelectTaskService,
    TaskListService,
    UserTasksService,
    AddTaskPageService,
    AuthenticationService,
    AlertService,
  ]
})
export class AppPanelModule { }
