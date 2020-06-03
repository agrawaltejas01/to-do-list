import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { UserService } from 'src/app/store/service/user.service';
import { userSchema } from 'src/app/store/schema/user-schema';
import { userTasksSchema, taskSchema } from 'src/app/store/schema/userTasks-schema';
import { SelectTaskService } from 'src/app/store/service/select-task.service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';
import { TaskListService } from 'src/app/store/service/task-list.service';
import { AddTaskPageService } from 'src/app/store/service/add-task-page-service';
import { AuthenticationService } from 'src/app/store/service/authentication.service';


// font awsome
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { retry } from 'rxjs/operators';
import { AlertService } from 'src/app/store/service/alert.service';








@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit
{

  
  searchTaskToggle : Boolean = false;  
  userTasksLabelList = {};

  userTaskDuplicate: userTasksSchema;

  allDataAvailable: Boolean = false;

  currentTab : string = 'All';
  noLabel = 'none';

  // font awsome
  faArchive = faArchive;
  faTrash = faTrash;
  faPlus = faPlus;
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;

  // store  
  appTaskList: taskSchema[] = [];
  taskList: taskSchema[];

  constructor(private userService: UserService,
    public taskSelectedService: SelectTaskService,
    private taskListService: TaskListService,
    public userTasksService: UserTasksService,
    public addTaskPageService: AddTaskPageService,
    private router : Router,
    public authenticationService: AuthenticationService,
    private alertService : AlertService) 
  {
    this.allDataAvailable = false;

    if(this.userTasksService.username == null)
      this.router.navigate(['login'])
  }

  ngOnInit(): void
  {
    if(this.userTasksService.username == null)
    {      
      this.router.navigate(['login'])
    }

    this.allDataAvailable = false;

    this.getUserTasks(this.userTasksService.username);
  }


  getUserTasks(username)
  {
    // Get all user tasks at a time
    this.userService.getUserTasks(username).subscribe((data: userTasksSchema) =>
    {

      // this.userTasksService.userTasks = data;      
      this.userTasksService.userTasks = data;

      this.userTasksService.getTaskLabel();      

      console.log(data);
      this.taskList = this.taskListService.getTasksOfFilter('none', 'none', -1, 
              -1, null, false, data);
      console.log(this.taskList);
      // console.log(this.userTasksService.userTasks.task);
    });

    this.allDataAvailable = true;

  }

  changeTab(label)
  {
    this.currentTab = label;

    let title: string = 'none'
    let priority: number = -1;
    let status: number = -1;
    let dueDate: Date = null;
    let archive: Boolean = false;


    if (label == 'All')
      label = 'none';

    if (label == 'Archive')
    {
      label = 'none';
      archive = true;
    }

    // unselect all selected task
    this.taskSelectedService.initAppTaskList()
    this.taskSelectedService.unSelectAllTask()

    this.taskList = this.taskListService.getTasksOfFilter(title, label, priority, 
      status, dueDate, archive, this.userTasksService.userTasks);
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
      if (result)
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

    let labelWillBeDeleted : Boolean = false;
    this.userService.deleteTask(this.userTasksService.username, idToBeDeleted).subscribe(result =>
    {
      // console.log(result);
      if (result)
      {
        labelWillBeDeleted = this.userTasksService.deleteTask(idToBeDeleted);
        
        labelWillBeDeleted ? this.changeTab('All') : this.changeTab(this.currentTab);
      }
    });

    this.taskSelectedService.initAppTaskList()

    // un select all tasks after operation
    this.taskSelectedService.unSelectAllTask()
  }

  searchTask()
  {
    this.searchTaskToggle = !this.searchTaskToggle;
  }

}
