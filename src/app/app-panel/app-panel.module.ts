import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { UserService } from '../store/service/user.service';

// Component
import { PanelComponent } from './panel/panel.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';

// fontAwsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectTaskService } from '../store/service/select-task.service';

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
  ],

  exports : 
  [
    PanelComponent,
    TaskListComponent
  ],

  providers :
  [
    UserService,
    SelectTaskService
  ]
})
export class AppPanelModule { }
