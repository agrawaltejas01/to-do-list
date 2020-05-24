import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { taskSchema } from '../schema/userTasks-schema';
import * as TaskActions from '../actions/task-actions';

const initialState: taskSchema =
{
    _id: 'abc',
    title: 'Initial State task',
    description: 'Initial task description',
    dueDate: new Date(),
    priority: 1,
    label: 'Personal',
    archive: false,
    status: 0
}

function removeFromState(state, id)
{
    return state.filter(function (element)
    {
        return element._id != id;
    })
}

function archiveTask(state, id)
{
    state.forEach(element => 
    {
        if(element._id == id)
            element.archive = !element.archive;
    });

    return state;
}

export function reducer(state: taskSchema[] = [], action: TaskActions.Actions)
{
    switch (action.type)
    {
        case TaskActions.ADD_TASK:

            // check for duplications
            if (state.indexOf(action.payload) === -1)
                return [...state, action.payload];

            else return state;

        case TaskActions.REMOVE_TASK:
            state = removeFromState(state, action.payload)
            return state;

        case TaskActions.REMOVE_ALL_TASK:
            state = [];
            return state;

        case TaskActions.ARCHIVE_TASK:
            state = archiveTask(state, action.payload)
            return state;


        default:
            return state;
    }
}