export class taskSchema
{    
    title : String;
    description : String;
    dueDate : Date;
    priority : Number;
    label : String;
    archive : Boolean;
}

export class userTaskSchema
{
    _id : String;
    username : String;
    task : taskSchema[];
}