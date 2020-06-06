use toDoList

db.user.insertOne(
    {
        _id : "dummyUser",
        password : "dummyPassword"
    }
)

db.userTasks.insertOne(
    {
        _id : "dummyUser",
        task : []
    }
)