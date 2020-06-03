import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { UserService } from 'src/app/store/service/user.service';
import { UserTasksService } from 'src/app/store/service/user-tasks-service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit
{

  @ViewChild('closeButton') closeButton;

  @Input() task: taskSchema;
  @Input() currentTab: String;
  @Input() taskList: taskSchema[];

  labelWillBeDeleted: Boolean = false;
  defaultLabels = ["Personal", "Work", "Shopping", "other"];
  labels = [];
  priorities = [{ label: "High", value: 1 }, { label: "Normal", value: 2 }, { label: "Low", value: 3 }];

  updateTaskForm: FormGroup;
  isLoading: Boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
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

  ngOnChanges()
  {
    // console.log("update input changes",this.task);
    this.ngOnInit();
  }

  updatePanelTaskList(newTask: taskSchema)
  {
    let indexOfUpdatedTask = this.taskList.findIndex((element) => (element._id == newTask._id));
    //either its' default tab or it's the same tab
    if (this.currentTab == "All" || this.currentTab == newTask.label)
    {
      if (indexOfUpdatedTask == -1)
        this.taskList.push(newTask);
      else
        this.taskList[indexOfUpdatedTask] = newTask;
    }
    else
    {
      // Remove from the taskList as label has changed
      this.taskList.splice(indexOfUpdatedTask, 1);
    }
    if (this.taskList.length == 0)
    {
      // The label is invalid and all the 
    }

  }

  toggleLoading()
  {
    this.isLoading = !this.isLoading;
  }
  ngOnInit(): void
  {    

    let currentDefaultDate: Date = new Date(this.task.dueDate);
    currentDefaultDate.setDate(currentDefaultDate.getDate());

    this.isLoading = false;
    this.updateLabels();
    this.updateTaskForm = this.fb.group({
      tasklabel: [this.task.label],
      tasktitle: [this.task.title, Validators.required],
      taskdescription: this.task.description,

      taskduedate: [new Date(currentDefaultDate).toISOString().split('T')[0], Validators.required],

      taskpriority: this.task.priority,
      tasknewlabel: "other",
    });
    // console.log(this.task);
    console.log(new Date(this.task.dueDate).toISOString().split('T')[0]);
  }
  submitTask()
  {    
    this.toggleLoading();
    if (!this.updateTaskForm.valid)
    {
      if (!this.updateTaskForm.value.tasktitle.valid)
      {
        alert("Title or Due Date should not be null");
        return;
      }
      else if (!this.updateTaskForm.value.taskduedate.valid)
      {
        alert("Title or Due Date should not be null");
        return;
      }
    }
    let userTaskBody = {
      "username": this.userTasksService.username,
      "task": new taskSchema()
    };
    let newTask = new taskSchema();
    // newTask=this.task;
    newTask.title = this.updateTaskForm.value.tasktitle;
    newTask.description = this.updateTaskForm.value.taskdescription;
    newTask.dueDate = this.updateTaskForm.value.taskduedate;
    newTask.priority = this.updateTaskForm.value.taskpriority;
    newTask.label = this.updateTaskForm.value.tasklabel;
    newTask.archive = this.task.archive;
    newTask._id = this.task._id;
    newTask.status = this.task.status;
    userTaskBody.task = newTask;
    // if task label is other then custom label will be added
    if (this.updateTaskForm.value.tasklabel === "other") 
    {
      userTaskBody.task.label = this.updateTaskForm.value.tasknewlabel;
    }
    this.userService.updateUserTask(userTaskBody).subscribe((data) =>
    {
      console.log("data from getUserTasks", data);
      if (data == false)
        console.log("errror");
      else
      {
        console.log("Success fully updated");
        this.task = newTask;
        this.labelWillBeDeleted =  this.userTasksService.updateTask(newTask);
        console.log("userTaskServ up");
        this.updatePanelTaskList(newTask);        
        // this.ngOnInit();
        this.closeButton.nativeElement.click();
        // this.task=newTask;
        // this.userTasksService.addTask(newTask);
        // this.addTaskPageService.toggleAddTaskPage();
      }
    },
      (error) => console.log("er", error));

  }
  cancelUpdates()
  {
    // To be implemented 
  }

}
