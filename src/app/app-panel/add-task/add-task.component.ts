import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/store/service/user.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  labels = [ "Personal","Work","Shopping","other" ];
  addTaskForm : FormGroup;
  
  constructor(private fb : FormBuilder,private userService : UserService){
    
  }
  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      tasklabel: ['Personal'],
      tasktitle:["",Validators.required],
      taskdescription:"",
      taskduedate:["",Validators.required],
      taskpriority:2,
      tasknewlabel:"other",
    });
  }
  
  log(val){
    console.log(val);
  }
  submitTask(){
    if (!this.addTaskForm.valid) {
      if(!this.addTaskForm.value.tasktitle.valid)
        alert("Title should not be null");
      else if(!this.addTaskForm.value.taskduedate.valid)
        alert("Fill in the due date for the task");
    }
    let userTaskBody = {
      "username":"Sagar",
      "task" : {
        "title":this.addTaskForm.value.tasktitle,
        "description":this.addTaskForm.value.taskdescription,
        "dueDate":this.addTaskForm.value.taskduedate,
        "priority":this.addTaskForm.value.taskpriority,
        "label":this.addTaskForm.value.tasklabel,
      }
    };
    // if task label is other then custom label will be added
    if(this.addTaskForm.value.tasklabel==="other") 
    {
      userTaskBody.task.label=this.addTaskForm.value.tasknewlabel;
    }
    this.userService.addUserTask(userTaskBody).subscribe((data) =>
    {
      console.log("data from getUserTasks",data);
    });
    console.log(userTaskBody);
    console.log(this.addTaskForm.value);
  }
}
