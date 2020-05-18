var mongo = require('mongoose');
var Schema = mongo.Schema;

const userTasksSchema = new Schema({
    _id : { type : String },
    task : [
        {
            _id : false,
            title : { type : String },
            description : { type : String },
            dueDate : { type : Date },
            priority : { type : Number, default : 2 },   // 1 = high , 3 = low
            label : { type : String, default : "Personal" },
            archive : { type : Boolean, default : false },        
        }
    ]

});

const userTasks = mongo.model("userTasks", userTasksSchema, "userTasks");
module.exports = userTasks;