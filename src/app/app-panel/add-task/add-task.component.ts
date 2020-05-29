import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/store/service/user.service';
import { EventEmitter } from 'protractor';
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
  labels = ["Personal", "Work", "Shopping", "other"];
  addTaskForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    public addTaskPageService: AddTaskPageService,
    private userTasksService: UserTasksService)
  {

  }
  ngOnInit(): void
  {
    this.addTaskForm = this.fb.group({
      tasklabel: ['Personal'],
      tasktitle: ["", Validators.required],
      taskdescription: "",
      taskduedate: ["", Validators.required],
      taskpriority: 2,
      tasknewlabel: "other",
    });
  }

  submitTask()
  {
    if (!this.addTaskForm.valid)
    {
      if (!this.addTaskForm.value.tasktitle.valid)
      {
        alert("Title should not be null");
        return;
      }
      else if (!this.addTaskForm.value.taskduedate.valid)
      {
        alert("Fill in the due date for the task");
        return;
      }
    }
    let userTaskBody = {
      "username": "Tejas",
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
    // if task label is other then custom label will be added
    if (this.addTaskForm.value.tasklabel === "other") 
    {
      userTaskBody.task.label = this.addTaskForm.value.tasknewlabel;
    }
    this.userService.addUserTask(userTaskBody).subscribe((data) =>
    {
      console.log("data from getUserTasks", data);
      if (data == false)
        console.log("errror");
      else
      {
        newTask._id = data;
        this.userTasksService.addTask(newTask);
        this.addTaskPageService.toggleAddTaskPage();
      }
    },
      (error) => console.log("er", error));
    // console.log(userTaskBody);
    // console.log(this.addTaskForm.value);
  }
}
