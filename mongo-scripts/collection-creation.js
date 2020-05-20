use toDoList;

db.createCollection("user", {
    validator :
    {
        $jsonSchema :
        {
            bsonType : 'object',
            required : ['_id', 'password'],
            properties :
            {
                _id : 
                {
                    bsonType : 'string',
                    description : '_id must be string and required'
                },

                password :
                {
                    bsonType : 'string',
                    description : 'password must be string and required'
                }
            }
        }
    }
})

db.user.insertOne(
    {
        _id : "Sagar",
        password : "12345"
    }
)

db.user.insertOne(
    {
        _id : "Tejas",
        password : "12345"
    }
)

// db.createCollection("userTasks", {
//     validator :
//     {
//         $jsonSchema : 
//         {
//             bsonType : "array",
//             description : "must be an array",

//             items : 
//             {
//                 bsonType : "object",
//                 required : ['username'],
//                 properties : 
//                 {
//                     username : 
//                     {
//                         bsonType : 'string',
//                         description : 'username must be string and required'
//                     },

//                     task :
//                     {
//                         bsonType : 'array',
//                         description : 'must be an array',

//                         items : 
//                         {
//                             bsonType : 'object',
//                             required : ['_id', 'title', 'description', 'dueDate', 'priority', 'label', 'archive'],
//                             properties :
//                             {
//                                 _id : 
//                                 {
//                                     bsonType : "objectId",
//                                     description : "must be an objectId and required"
//                                 },

//                                 title :
//                                 {
//                                     bsonType : 'string',
//                                     description : 'title must be string and required'
//                                 },

//                                 description :
//                                 {
//                                     bsonType : 'string',
//                                     description : 'description must be string and required'
//                                 },

//                                 dueDate:
//                                 {
//                                     bsonType : 'date',
//                                     description : 'dueDate must be date and required'
//                                 },

//                                 priority:
//                                 {
//                                     bsonType : 'int',
//                                     description : 'priority must be int and required'
//                                 },

//                                 label:
//                                 {
//                                     bsonType : 'string',
//                                     description : 'label must be string and required'
//                                 },

//                                 archive:
//                                 {
//                                     bsonType : 'bool',
//                                     description : 'archive must be bool and required'
//                                 },
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// })

db.userTasks.insertOne(
    {
        _id : "Tejas",
        task : 
        [
            {
                _id : ObjectId(),
                priority: 1,
                label: 'Group',
                archive: false,
                title: 'Implement To-do list',
                description: 'None',
                dueDate: new Date("2020-06-01"),
                status : 0
              },
              {
                _id : ObjectId(),
                priority: 1,
                label: 'Group',
                archive: false,
                title: 'Test everything',
                description: 'Testing',
                dueDate: new Date("2020-05-29"),
                status : 0
              },
              {
                _id : ObjectId(),
                priority: 2,
                label: 'Group',
                archive: false,
                title: 'Test Date filter',
                description: 'Testing',
                dueDate: new Date("2020-05-29"),
                status : 0
              },
              {
                _id : ObjectId(),
                priority: 3,
                label: 'Personal',
                archive: false,
                title: 'Netflix',
                description: 'Finish HOC',
                dueDate: new Date("2020-05-30"),
                status : 0
              }
            ]
    }
)

db.userTasks.insertOne(
    {
        _id : "Sagar",
        task : 
        [
            {    
                _id : ObjectId(),            
                title : "Implement To-do list",
                description : "None",
                dueDate : new Date("2020-06-01"),
                priority : 1,
                label : 'Group',
                archive : false,
                status : 0
            }
        ]
    }
)