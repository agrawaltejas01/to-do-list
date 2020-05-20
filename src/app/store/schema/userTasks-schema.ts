export class taskSchema
{   
    _id : String;
    title : String;
    description : String;
    dueDate : Date;
    priority : Number;
    label : String;
    archive : Boolean;
    status : Number;
}

export class userTasksSchema
{
    _id : String;
    username : String;
    task : taskSchema[];
}