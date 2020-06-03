import { Injectable } from '@angular/core';

// Service
import { taskSchema, userTasksSchema } from '../schema/userTasks-schema';

@Injectable({
    providedIn: 'root'
})

export class UserTasksService
{
    username: string = "Tejas";


    // username: string = null;
    userTasks: userTasksSchema = null;
    userTasksLabelList = {};

    setUserName(currentUserName: string)
    {
        this.username = currentUserName;
    }

    getTaskLabel()
    {
        this.userTasks.task.forEach((element) =>
        {
            this.addTaskLabel(element)
        });
    }

    changeTaskStatus(id: string, status: number)
    {
        this.userTasks.task.forEach(task =>
        {
            if (task._id == id)
                task.status = status;
        })
    }

    changeTaskPriority(id: string, priority: number)
    {
        this.userTasks.task.forEach(task =>
        {
            if (task._id == id)
                task.priority = priority;
        })
    }

    archiveTask(idToBeArchived: string[])
    {
        this.userTasks.task.forEach(task =>
        {
            if (idToBeArchived.indexOf(task._id) > -1)
            {
                task.archive = !task.archive;
            }
        })
    }

    deleteTask(idToBeDeleted: string[])
    {
        let labelWillBeDeleted: Boolean = false;
        for (let index = 0; index < this.userTasks.task.length; index++) 
        {
            if (idToBeDeleted.indexOf(this.userTasks.task[index]._id) > -1)
            {
                // If there is even one label that will be deleted, labelWillBeDeleted will be always be true
                labelWillBeDeleted =
                    labelWillBeDeleted ? true : this.checkUnusedLabel(this.userTasks.task[index].label);
                this.userTasks.task.splice(index, 1);
                index--;
            }

        }
        return labelWillBeDeleted;
    }

    addTask(task: taskSchema)
    {
        this.userTasks.task.push(task);
        this.addTaskLabel(task);
    }

    addTaskLabel(task: taskSchema)
    {
        if (task.label in this.userTasksLabelList)
            this.userTasksLabelList[task.label] = this.userTasksLabelList[task.label] + 1;

        else
            this.userTasksLabelList[task.label] = 1;
    }

    checkUnusedLabel(label: string)
    {
        if (this.userTasksLabelList[label] == 1)
        {
            console.log("IGI checkUnusedLabel and found label " + label + " With count " + this.userTasksLabelList[label]);
            delete this.userTasksLabelList[label];
            return true;
        }

        else if (this.userTasksLabelList[label] > 1)
        {
            console.log("IGI checkUnusedLabel and found label " + label + " With count " + this.userTasksLabelList[label]);
            this.userTasksLabelList[label] = this.userTasksLabelList[label] -1;
            return false;
        }
    }

    getTaskLabelListArray():string[]
    {
        let labelList : string[]=[];
        for(var i in this.userTasksLabelList)
            labelList.push(i);
        return labelList;
    }

    updateTask(modifiedTask : taskSchema)
    {
        let labelWillBeDeleted: Boolean = false;

        let indexOfUpdatedTask = this.userTasks.task.findIndex((task)=>(task._id==modifiedTask._id));
        console.log("update task user tasks",indexOfUpdatedTask); 
        let oldLabel =  this.userTasks.task[indexOfUpdatedTask].label;

        if(modifiedTask.label != oldLabel)
        {
            // Label is updated
            labelWillBeDeleted =
                    labelWillBeDeleted ? true : this.checkUnusedLabel(oldLabel);            
            this.addTaskLabel(modifiedTask);
        }

        this.userTasks.task[indexOfUpdatedTask]=modifiedTask;   
        return labelWillBeDeleted;
    }
}