import { Component, OnInit } from '@angular/core';

// Store
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as TaskActions from '../../store/actions/task-actions';

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
  appTaskList$: Observable<taskSchema[]>;
  appTaskList: taskSchema[] = [];
  observableSub: Subscription;

  constructor(private userService: UserService,
    private store: Store<AppState>,
    public taskSelectedService: SelectTaskService) 
  {
    this.allDataAvailable = false;
    this.appTaskList$ = store.select('task');    
  }

  ngOnInit(): void
  {
    this.allDataAvailable = false;
    
    this.getUserTasks(this.username);    
  }


  getUserTasks(username)
  {
    // Get all user tasks at a time
    this.userService.getUserTasks(username).subscribe((data) =>
    {      

      this.userTasks = data;      

      // Create labels list from all available labels in user tasks
      this.userTasks.task.forEach((element) =>
      {
        if (this.userTasksLabelList.indexOf(element.label) === -1)
          this.userTasksLabelList.push(element.label);
      });
    });

    this.allDataAvailable = true;
  }

  changeTab(label)
  {    
    this.currentTab = label;
    // this.userTasks = this.userTaskDuplicate
  }

  archiveTasks()
  {
    let idToBeArchived: String[] = [];
    
    // traverse appTaskList$
    this.observableSub = this.appTaskList$.subscribe(element =>     
    {      

      element.forEach(task =>
        {
          idToBeArchived.push(task._id);

        })      
    });
    
    // call API to archive tasks
    this.userService.archiveTask(this.username, idToBeArchived).subscribe(result =>
      {
        // console.log(result);
      });

    // unsubscribe observable service after operation
    this.observableSub.unsubscribe();

    // empty store after operation
    this.store.dispatch(new TaskActions.RemoveAllTask());

    // un select all tasks after operation
    this.taskSelectedService.unSelectAllTask()

  }

}
