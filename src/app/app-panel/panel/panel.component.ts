import { Component, OnInit } from '@angular/core';

// Store
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import * as TaskActions from '../../store/actions/task-actions';

// Service
import { UserService } from 'src/app/store/service/user.service';
import { userSchema } from 'src/app/store/schema/user-schema';
import { userTasksSchema, taskSchema } from 'src/app/store/schema/userTasks-schema';

// font awsome
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


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

  allDataAvailable : Boolean = false;

  currentTab = 'All';  
  noLabel = 'none';

  // font awsome
  faArchive = faArchive;
  faTrash = faTrash;
  faPlus = faPlus;

  // store
  appTaskList : Observable<taskSchema[]>;

  constructor(private userService: UserService,
              private store : Store<AppState>) 
  { 
    this.allDataAvailable = false;
    this.appTaskList = store.select('task');
  }

  ngOnInit(): void
  {
    this.allDataAvailable = false;
    // console.log(this.userTasks);
    this.getUserTasks(this.username);
    // console.log(this.userTasks);
  }

  getUserTasks(username)
  {
    // Get all user tasks at a time
    this.userService.getUserTasks(username).subscribe((data) =>
    {
      this.userTasks = data;
      // this.userTaskDuplicate = this.userTasks;

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
    // console.log(label);
    this.currentTab = label;
    
  }
}
