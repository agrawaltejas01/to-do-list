import { Component, OnInit, Input } from '@angular/core';

// Store
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';

// Service
import { userTasksSchema } from 'src/app/store/schema/userTasks-schema';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import * as TaskActions from '../../store/actions/task-actions';

// font awsome
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit 
{

  @Input() public userTasks: userTasksSchema
  @Input() public label: String
  @Input() public priority: Number
  @Input() public dueDate: Date

  date: any;
  month: any;
  year: any;

  taskList: taskSchema[] = [];

  // font awsome
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;
  faCheckCircle = faCheckCircle;
  faFlag = faFlag;

  taskSelected: Boolean[] = [false];
  taskStatus: Number = 0;
  taskPriority: Number = 2;

  // store
  appTaskList : Observable<taskSchema[]>;

  constructor( private store : Store<AppState>) 
  {
    this.appTaskList = store.select('task');
  }

  ngOnInit(): void 
  {
    // Initialize everything
    this.init();


    this.getTasksOfFilter()    
  }  

  init()
  {
    // initialize taskList
    this.taskList = [];

    // get date from input dueDate
    this.date = new Date(this.dueDate).getDate()
    this.month = new Date(this.dueDate).getMonth()
    this.year = new Date(this.dueDate).getFullYear()

    // initialize appTaskList
    this.store.dispatch(new TaskActions.RemoveAllTask());
  }

  getTasksOfFilter() 
  {

    // Check if no filter applied
    if (this.label == "none" && this.priority == -1 && this.dueDate == null)
    {
      this.taskList = this.userTasks.task;
      return;
    }

    // check if label has to be applied
    if (this.label != "none") 
    {
      this.userTasks.task.forEach(element =>
      {
        if (element.label == this.label) 
        {
          this.taskList.push(element);
        }
      })
    }

    // check if priority has to be applied
    if (this.priority != -1)
    {
      // check if label has been applied
      if (this.taskList.length == 0) 
      {
        // label has not been applied
        // traverse userTasks
        this.userTasks.task.forEach(element =>
        {
          if (element.priority == this.priority) 
          {
            this.taskList.push(element);
          }
        })
      }

      else if (this.taskList.length > 0) 
      {
        for (let index = 0; index < this.taskList.length; index++) 
        {
          if (this.taskList[index].priority != this.priority)
          {
            this.taskList.splice(index, 1);
            index--;
          }

        }

      }
    }

    // check if dueDate has to be applied
    if ((this.dueDate != null))
    {
      // check if label or priority has been applied
      if (this.taskList.length == 0) 
      {
        // label or priority has not been applied
        // traverse userTasks
        this.userTasks.task.forEach(element =>
        {
          if (
            new Date(element.dueDate).getDate() == this.date &&
            new Date(element.dueDate).getMonth() == this.month &&
            new Date(element.dueDate).getFullYear() == this.year
          ) 
          {
            this.taskList.push(element);
          }
        })
      }

      else if (this.taskList.length > 0) 
      {
        for (let index = 0; index < this.taskList.length; index++) 
        {
          if (
            new Date(this.taskList[index].dueDate).getMonth() != this.month ||
            new Date(this.taskList[index].dueDate).getFullYear() != this.year ||
            new Date(this.taskList[index].dueDate).getDate() != this.date
          )
          {
            this.taskList.splice(index, 1);
            index--;
          }

        }

      }
    }

  }


  selectTask(index)
  {
    this.taskSelected[index] = !this.taskSelected[index];

    if(this.taskSelected[index])
      this.store.dispatch(new TaskActions.AddTask(this.taskList[index]));
    
    else
      this.store.dispatch(new TaskActions.RemoveTask(this.taskList[index]._id));
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