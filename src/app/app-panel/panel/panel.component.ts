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

  currentTab = 'All';

  constructor(private userService: UserService) { }

  ngOnInit(): void
  {
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
  }

  changeTab(label)
  {
    // console.log(label);
    this.currentTab = label;
  }
}
