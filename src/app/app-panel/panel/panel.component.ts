import { Component, OnInit } from '@angular/core';


// Service
import { UserService } from 'src/app/store/service/user.service';
import { userSchema } from 'src/app/store/schema/user-schema';
import { userTasksSchema, taskSchema } from 'src/app/store/schema/userTasks-schema';
import { SelectTaskService } from 'src/app/store/service/select-task.service';

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
  username: String = 'Tejas';
  userTasks: userTasksSchema = null;
  userTasksLabelList: String[] = [];

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
    private taskListService: TaskListService) 
  {
    this.allDataAvailable = false;     
  }

  ngOnInit(): void
  {
    this.allDataAvailable = false;
    
    this.getUserTasks(this.username);    
  }


  getUserTasks(username)
  {
    // Get all user tasks at a time
    this.userService.getUserTasks(username).subscribe((data : userTasksSchema) =>
    {      

      this.userTasks = data;      

      // Create labels list from all available labels in user tasks
      this.userTasks.task.forEach((element) =>
      {
        if (this.userTasksLabelList.indexOf(element.label) === -1)
          this.userTasksLabelList.push(element.label);
      });

      this.taskList = this.taskListService.getTasksOfFilter('none', -1, null, false, data);
    });

    this.allDataAvailable = true;
   
  }

  changeTab(label)
  { 
    this.currentTab = label;

    let priority : Number = -1;
    let dueDate : Date = null;
    let archive : Boolean = false;
    
    
    if(label == 'All')  
      label = 'none';
    
    if(label == 'Archive')
    {
      label = 'none';
      archive = true;
    }

    this.taskList = this.taskListService.getTasksOfFilter(label, priority, dueDate, archive, this.userTasks);
  }

  archiveTasks()
  {
    let idToBeArchived: String[] = [];
    
    // traverse appTaskList$
    this.taskSelectedService.appTaskList.forEach(task =>
      {
        idToBeArchived.push(task._id);        
      })
    
    // call API to archive tasks
    this.userService.archiveTask(this.username, idToBeArchived).subscribe(result =>
      {
        // console.log(result);
        if(result)
        {
          this.userTasks.task.forEach(element => 
          {
            if (idToBeArchived.indexOf(element._id) > -1 )
              element.archive = ! element.archive;
          });

          this.changeTab(this.currentTab);
        }
      });

    this.taskSelectedService.initAppTaskList()

    // un select all tasks after operation
    this.taskSelectedService.unSelectAllTask()

  }

  deleteTasks()
  {
    let idToBeDeleted: String[] = [];
    
  //   // traverse appTaskList$
  //   this.observableSub = this.appTaskList$.subscribe(element =>     
  //   {      

  //     element.forEach(task =>
  //       {
  //         idToBeDeleted.push(task._id);

  //       })      
  //   });
    
  //   // call API to archive tasks
  //   this.userService.deleteTask(this.username, idToBeDeleted).subscribe(result =>
  //     {
  //       // console.log(result);
  //     });

  //   // unsubscribe observable service after operation
  //   this.observableSub.unsubscribe();

  //   // empty store after operation
  //   this.store.dispatch(new TaskActions.RemoveAllTask());

  //   // un select all tasks after operation
  //   this.taskSelectedService.unSelectAllTask()
  }

}
