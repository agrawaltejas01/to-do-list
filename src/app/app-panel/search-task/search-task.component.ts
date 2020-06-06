import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// Services
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';
import { TaskListService } from 'src/app/store/service/task-list.service';
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

  constructor(
    public taskSelectedService: SelectTaskService,
    private taskListService: TaskListService,
    public userTasksService: UserTasksService,
    private formBuilder: FormBuilder) 
  {    
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
      dueDate.setDate(dueDate.getDate());
    }    

    status = this.searchTaskForm.value.taskStatus;
    archive = this.searchTaskForm.value.taskArchive;      

    this.taskList = this.taskListService.getTasksOfFilter(title, label, priority,
      status, dueDate, archive, this.userTasksService.userTasks);
  }
}
