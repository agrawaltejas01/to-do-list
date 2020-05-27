import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';
import { TaskListService } from 'src/app/store/service/task-list.service';
import { UserService } from 'src/app/store/service/user.service';
import { SelectTaskService } from 'src/app/store/service/select-task.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit 
{
  taskList: taskSchema[];
  userTasksLabelList: string[] = [];
  searchTaskForm: FormGroup;

  constructor(private userService: UserService,
    public taskSelectedService: SelectTaskService,
    private taskListService: TaskListService,
    public userTasksService: UserTasksService,
    private formBuilder: FormBuilder) 
  {
    this.userTasksLabelList = this.userTasksService.userTasksLabelList;
  }

  ngOnInit(): void 
  {
    this.resetForm()
  }

  resetForm()
  {
    this.searchTaskForm = this.formBuilder.group(
      {
        taskLabel: "",
        taskTitle: "",
        taskPriority: -1,
        taskDueDate: null,
        taskStatus: -1,
        taskArchive: false,
      }
    );
    this.taskList = null;
  }

  searchTask()
  {
    let title: string = 'none';
    let label: string = 'none';
    let priority: number = -1;
    let dueDate: Date = null;
    let status: number = -1;
    let archive: Boolean = false;

    if (this.searchTaskForm.value.taskTitle != "")
      title = this.searchTaskForm.value.taskTitle;

    if (this.searchTaskForm.value.taskLabel != "")
      label = this.searchTaskForm.value.taskLabel;

    priority = this.searchTaskForm.value.taskPriority;
    
    if (this.searchTaskForm.value.taskDueDate)
    {
      dueDate = new Date(this.searchTaskForm.value.taskDueDate);
      dueDate.setDate(dueDate.getDate() + 1);
    }
    // dueDate = this.searchTaskForm.value.taskDueDate;

    status = this.searchTaskForm.value.taskStatus;
    archive = this.searchTaskForm.value.taskArchive;

    console.log(title);
    console.log(label);
    console.log(priority);
    console.log(status);
    console.log(dueDate);
    console.log(archive);    

    this.taskList = this.taskListService.getTasksOfFilter(title, label, priority,
      status, dueDate, archive, this.userTasksService.userTasks);
  }
}
