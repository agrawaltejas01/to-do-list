import { Component, OnInit } from '@angular/core';

// Service
import { UserService } from 'src/app/store/service/user.service';
import { userSchema } from 'src/app/store/schema/user-schema';
import { userTasksSchema } from 'src/app/store/schema/userTasks-schema';

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
  // userTaskDuplicate : userTasksSchema = null;
  noLabel = 'none';

  constructor(private userService: UserService) 
  { 
    this.allDataAvailable = false;
  }

  ngOnInit(): void
  {
    this.allDataAvailable = false;
    console.log(this.userTasks);
    this.getUserTasks(this.username);
    console.log(this.userTasks);
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
