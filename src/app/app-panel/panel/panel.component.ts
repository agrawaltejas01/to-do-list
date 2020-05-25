import { Component, OnInit } from '@angular/core';


// Service
import { UserService } from 'src/app/store/service/user.service';
import { userSchema } from 'src/app/store/schema/user-schema';
import { userTasksSchema, taskSchema } from 'src/app/store/schema/userTasks-schema';
import { SelectTaskService } from 'src/app/store/service/select-task.service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';

// font awsome
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { retry } from 'rxjs/operators';
import { TaskListService } from 'src/app/store/service/task-list.service';




@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit
{
  
  userTasks: userTasksSchema = null;
  userTasksLabelList: string[] = [];

  userTaskDuplicate : userTasksSchema;

  allDataAvailable: Boolean = false;

  currentTab = 'All';
  noLabel = 'none';

  // font awsome
  faArchive = faArchive;
  faTrash = faTrash;
  faPlus = faPlus;

  // store  
  appTaskList: taskSchema[] = [];  
  taskList: taskSchema[];

  constructor(private userService: UserService,    
    public taskSelectedService: SelectTaskService,
    private taskListService: TaskListService,
    public userTasksService :   UserTasksService  ) 
  {
    this.allDataAvailable = false;     
  }

  ngOnInit(): void
  {
    this.allDataAvailable = false;
    
    this.getUserTasks(this.userTasksService.username);    
  }


  getUserTasks(username)
  {
    // Get all user tasks at a time
    this.userService.getUserTasks(username).subscribe((data : userTasksSchema) =>
    {      

      // this.userTasksService.userTasks = data;      
      this.userTasksService.userTasks = data;
      // console.log(this.userTasksService.userTasks.task);

      // Create labels list from all available labels in user tasks
      this.userTasksService.userTasks.task.forEach((element) =>
      {
        if (this.userTasksLabelList.indexOf(element.label) === -1)
          this.userTasksLabelList.push(element.label);
      });

      this.taskList = this.taskListService.getTasksOfFilter('none', -1, null, false, data);
      console.log(this.taskList);
      // console.log(this.userTasksService.userTasks.task);
    });

    this.allDataAvailable = true;
   
  }

  changeTab(label)
  { 
    this.currentTab = label;

    let priority : number = -1;
    let dueDate : Date = null;
    let archive : Boolean = false;
    
    
    if(label == 'All')  
      label = 'none';
    
    if(label == 'Archive')
    {
      label = 'none';
      archive = true;
    }

    this.taskList = this.taskListService.getTasksOfFilter(label, priority, dueDate, archive, this.userTasksService.userTasks);
  }

  archiveTasks()
  {
    let idToBeArchived: string[] = [];
    
    // traverse appTaskList$
    this.taskSelectedService.appTaskList.forEach(task =>
      {
        idToBeArchived.push(task._id);        
      })
    
    // call API to archive tasks
    this.userService.archiveTask(this.userTasksService.username, idToBeArchived).subscribe(result =>
      {
        // console.log(result);
        if(result)
        {          
          this.userTasksService.archiveTask(idToBeArchived);

          this.changeTab(this.currentTab);
        }
      });

    this.taskSelectedService.initAppTaskList()

    // un select all tasks after operation
    this.taskSelectedService.unSelectAllTask()

  }

  deleteTasks()
  {
    let idToBeDeleted: string[] = [];
    
    this.taskSelectedService.appTaskList.forEach(task =>
    {
      idToBeDeleted.push(task._id);        
    })
    
    this.userService.deleteTask(this.userTasksService.username, idToBeDeleted).subscribe(result =>
      {
        // console.log(result);
        if(result)
        {
          this.userTasksService.deleteTask(idToBeDeleted);

          this.changeTab(this.currentTab);
        }
      });

    this.taskSelectedService.initAppTaskList()

    // un select all tasks after operation
    this.taskSelectedService.unSelectAllTask()
  }

}
