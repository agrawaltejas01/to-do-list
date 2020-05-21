import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { taskSchema } from '../schema/userTasks-schema';

export const ADD_TASK = '[TASKSCHEMA] Add'
export const REMOVE_TASK = '[TASKSCHEMA] Remove'
export const REMOVE_ALL_TASK = '[TASKSCHEMA] RemoveAll'

export class AddTask implements Action
{
    readonly type = ADD_TASK

    constructor (public payload : taskSchema)
    {

    }
}

export class RemoveTask implements Action
{
    readonly type = REMOVE_TASK

    constructor (public payload : String)
    {
        
    }
}

export class RemoveAllTask implements Action
{
    readonly type = REMOVE_ALL_TASK

    constructor ()
    {
        
    }
}


export type Actions = AddTask | RemoveTask | RemoveAllTask