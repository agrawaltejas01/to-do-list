import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { taskSchema } from 'src/app/store/schema/userTasks-schema';
import { UserService } from 'src/app/store/service/user.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  @Input() task : taskSchema;
  labels = ["Personal", "Work", "Shopping", "other"];
  priorities = [ { label:"High", value:1 } , { label:"Normal", value:2 } , { label:"Low", value:3 }];
  updateTaskForm: FormGroup;
  isLoading : Boolean =false;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    ) {
      
     }
  
  ngOnChanges(){
    // console.log("update input changes",this.task);
    this.ngOnInit();
  }
  toggleLoading()
  {
    this.isLoading = !this.isLoading;
  }
  ngOnInit(): void
  {
    let currentDefaultDate : Date = new Date(this.task.dueDate);
    currentDefaultDate.setDate(currentDefaultDate.getDate() - 1);
    
    this.isLoading=false;
    if(!this.labels.includes(this.task.label)) 
      this.labels.push(this.task.label);
    this.updateTaskForm = this.fb.group({
      tasklabel: [this.task.label] ,
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
      "username": "Tejas",
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
        this.task=newTask;
        this.ngOnInit();        
      }
    },
      (error) => console.log("er", error));    
  
  }
  cancelUpdates()
  {
    // To be implemented 
  }

}
