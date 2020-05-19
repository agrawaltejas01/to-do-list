import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { UserService } from '../store/service/user.service';

// Component
import { PanelComponent } from './panel/panel.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';


@NgModule({
  declarations: 
  [
    PanelComponent,
    TaskListComponent
    AddTaskComponent
  ],

  imports: 
  [
    CommonModule,
    HttpClientModule
  ],

  exports : 
  [
    PanelComponent,
    TaskListComponent
  ],

  providers :
  [
    UserService
  ]
})
export class AppPanelModule { }
