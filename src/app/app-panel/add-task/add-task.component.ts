import { Component, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/store/service/user.service';
import { EventEmitter, element } from 'protractor';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { AddTaskPageService } from 'src/app/store/service/add-task-page-service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit
{
  @Input() currentTab: String;
  @Input() taskList: taskSchema[];

  defaultLabels = ["Personal", "Work", "Shopping", "other"];
  labels = [];
  priorities = [{ label: "High", value: 1 }, { label: "Normal", value: 2 }, { label: "Low", value: 3 }];


  addTaskForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    public addTaskPageService: AddTaskPageService,
    private userTasksService: UserTasksService)
  {

  }
  updateLabels()
  {
    this.labels = this.userTasksService.getTaskLabelListArray();

    //Check whether default labels are already present in Label list for service, only one copy of a label to be present
    this.defaultLabels.forEach((element) =>
    {
      if (this.labels.indexOf(element) == -1)
        this.labels.push(element);
    });
  }
  ngOnInit(): void
  {
    this.updateLabels();
    this.addTaskForm = this.fb.group({
      tasklabel: ['Personal'],
      tasktitle: ["", Validators.required],
      taskdescription: "",
      taskduedate: ["", Validators.required],
      taskpriority: 2,
      tasknewlabel: "other",
    });
  }

  addToPanelTaskList(newTask: taskSchema)
  {
    //either its' default tab or it's the same tab
    if (this.currentTab == "All" || this.currentTab == newTask.label)
      this.taskList.push(newTask);
  }

  submitTask()
  {
    if (!this.addTaskForm.valid)
    {
      if (!this.addTaskForm.value.tasktitle.valid)
      {
        alert("Title and Due Date should not be null");
        return;
      }
      else if (!this.addTaskForm.value.taskduedate.valid)
      {
        alert("Title and Due Date should not be null");
        return;
      }
    }
    let userTaskBody = {
      "username": this.userTasksService.username,
      "task": new taskSchema()
    };
    let newTask = new taskSchema();
    newTask.title = this.addTaskForm.value.tasktitle;
    newTask.description = this.addTaskForm.value.taskdescription;
    newTask.dueDate = this.addTaskForm.value.taskduedate;
    newTask.priority = this.addTaskForm.value.taskpriority;
    newTask.label = this.addTaskForm.value.tasklabel;
    newTask.archive = false;
    newTask.status = 0;
    userTaskBody.task = newTask;

    if (this.addTaskForm.value.tasklabel === "other") 
    {
      userTaskBody.task.label = this.addTaskForm.value.tasknewlabel;
    }
    this.userService.addUserTask(userTaskBody).subscribe((data) =>
    {
      if (data == false)
        console.log("errror");
      else
      {
        newTask._id = data;
        this.userTasksService.addTask(newTask);
        this.addToPanelTaskList(newTask);
        this.addTaskPageService.toggleAddTaskPage();
      }
    },
      (error) => console.log("er", error));

  }
}
