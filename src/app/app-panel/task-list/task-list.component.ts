import { Component, OnInit, Input } from '@angular/core';

// Service
import { userTasksSchema } from 'src/app/store/schema/userTasks-schema';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { element } from 'protractor';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit 
{
  
  @Input() public userTasks : userTasksSchema
  @Input() public label : String
  @Input() public priority : Number
  @Input() public dueDate : Date
  
   date : any;
   month : any;
   year : any;

  taskList : taskSchema[] = [];
  temp : taskSchema[] = [];
  
  constructor() 
  { 

  }

  ngOnInit(): void 
  { 
    // console.log(this.dueDate)
    this.date = new Date(this.dueDate).getDate()
    this.month = new Date(this.dueDate).getMonth()
    this.year = new Date(this.dueDate).getFullYear()

    console.log(this.date + this.month + this.year)
    this.getTasksOfFilter()
  }
  
  getTasksOfFilter() 
  {
    // check if label has to be applied
    if (this.label != "") 
    {
      this.userTasks.task.forEach(element =>
      {
        if(element.label == this.label) 
        {
          this.taskList.push(element);
        }          
      })
    }

    // check if priority has to be applied
    if(this.priority != -1)
    {
      // check if label has been applied
      if(this.taskList.length == 0) 
      {
        // label has not been applied
        // traverse userTasks
        this.userTasks.task.forEach(element =>
          {
            if(element.priority == this.priority) 
            {
              this.taskList.push(element);
            }          
          })
      }

      else if(this.taskList.length > 0) 
      {        
        for (let index = 0; index < this.taskList.length; index++) 
        {          
          if(this.taskList[index].priority != this.priority)
          {
            this.taskList.splice(index,1);
            index--;
          }
          
        }
          
      }
    }

    // check if dueDate has to be applied
    if((this.dueDate != null))
    {
      // check if label or priority has been applied
      if(this.taskList.length == 0) 
      {
        // label or priority has not been applied
        // traverse userTasks
        this.userTasks.task.forEach(element =>
          {
            if(
              new Date(element.dueDate).getDate() == this.date &&
              new Date(element.dueDate).getMonth() == this.month &&
              new Date(element.dueDate).getFullYear() == this.year
              ) 
            {
              this.taskList.push(element);
            }          
          })
      }

      else if(this.taskList.length > 0) 
      {        
        for (let index = 0; index < this.taskList.length; index++) 
        {          
          if(
            new Date(this.taskList[index].dueDate).getMonth() != this.month ||
            new Date(this.taskList[index].dueDate).getFullYear() != this.year ||
            new Date(this.taskList[index].dueDate).getDate() != this.date
            )
          {
            this.taskList.splice(index,1);
            index--;
          }
          
        }
          
      }     
    }
        
  }
}
