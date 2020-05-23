import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { UserService } from '../store/service/user.service';
import { TaskListService } from '../store/service/task-list.service';
import { SelectTaskService } from '../store/service/select-task.service';


// Component
import { PanelComponent } from './panel/panel.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

// fontAwsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: 
  [
    PanelComponent,
    TaskListComponent,
    AddTaskComponent,
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
    TaskListComponent
  ],

  providers :
  [
    UserService,
    SelectTaskService,
    TaskListService
  ]
})
export class AppPanelModule { }
