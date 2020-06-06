import { Component, OnInit, Input } from '@angular/core';

// Store
import { Observable } from 'rxjs';

// Service
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { SelectTaskService } from 'src/app/store/service/select-task.service';
import { UserService } from 'src/app/store/service/user.service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';


// font awsome
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit 
{

  @Input() taskList: taskSchema[] = [];
  @Input() currentTab : String;

  // font awsome
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faHourglassHalf = faHourglassHalf;
  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;
  faFlag = faFlag;
  faSmileBeam = faSmileBeam;
  faPencilSquare = faPenSquare;

  taskSelected: Boolean[] = [];
  taskStatus: number = 0;
  taskPriority: number = 2;

  isExpanded : Boolean = false;
  selectedTaskForUpdate : taskSchema = null;

  // store
  appTaskList$: Observable<taskSchema[]>;

  constructor(private userService: UserService,
    public taskSelectedService: SelectTaskService,    
    public userTasksService: UserTasksService) 
  {
  }

  ngOnInit(): void 
  {

  }

  selectTaskForUpdate(task)
  {
    this.selectedTaskForUpdate = task;
  }
  selectTask(index)
  {
    this.taskSelectedService.taskSelected[index] = !this.taskSelectedService.taskSelected[index];

    if (this.taskSelectedService.taskSelected[index])      
      this.taskSelectedService.insertInAppTaskList(this.taskList[index]);

    else      
      this.taskSelectedService.removeFromAppTaskList(this.taskList[index]._id);
  }

  toggleTaskStatus(index, status)
  {
    this.taskList[index].status = status;

    this.userService.changeTaskStatus(this.userTasksService.username, this.taskList[index]._id, status)
      .subscribe(result =>
      {
        if (result)
        {          
          this.userTasksService.changeTaskStatus(this.taskList[index]._id, status);
        }
      })
  }

  toggleTaskPriority(index, priority)
  {
    this.taskList[index].priority = priority;

    this.userService.changeTaskPriority(this.userTasksService.username, this.taskList[index]._id, priority)
      .subscribe(result =>
      {
        if (result)
        {          
          this.userTasksService.changeTaskPriority(this.taskList[index]._id, priority);
        }
      })
  }
}
