import { Component, OnInit, Input } from '@angular/core';

// Store
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// Service
import { userTasksSchema } from 'src/app/store/schema/userTasks-schema';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { SelectTaskService } from 'src/app/store/service/select-task.service';
import { TaskListService } from 'src/app/store/service/task-list.service';



// font awsome
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit 
{
  
  @Input() taskList: taskSchema[] = [];  

  // font awsome
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faSpinner = faSpinner;
  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;
  faFlag = faFlag;
  faSmileBeam = faSmileBeam;

  taskSelected: Boolean[] = [];
  taskStatus: number = 0;
  taskPriority: number = 2;

  // store
  appTaskList$: Observable<taskSchema[]>;

  constructor(
    public taskSelectedService: SelectTaskService,
    private taskListService: TaskListService) 
  {      
  }

  ngOnInit(): void 
  {    

  }    

  selectTask(index)
  {
    this.taskSelectedService.taskSelected[index] = !this.taskSelectedService.taskSelected[index];

    if (this.taskSelectedService.taskSelected[index])
      // this.store.dispatch(new TaskActions.AddTask(this.taskList[index]));
      this.taskSelectedService.insertInAppTaskList(this.taskList[index]);

    else
      // this.store.dispatch(new TaskActions.RemoveTask(this.taskList[index]._id));
      this.taskSelectedService.removeFromAppTaskList(this.taskList[index]._id);
  }

  toggleTaskStatus(index, status)
  {
    this.taskList[index].status = status;
  }

  toggleTaskPriority(index, priority)
  {
    this.taskList[index].priority = priority
  }
}
