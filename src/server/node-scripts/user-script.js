const express = require('express')
const bodyParser = require('body-parser')
var mongo = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const app = express()

user = require('../schema/user-schema')
userTasks = require('../schema/userTasks-schema')

app.use(bodyParser.json())

var db = mongo.connect('mongodb://localhost:27017/toDoList',
    function(err, response) {
        if (err)
            console.log(err);

        else
            console.log("Successfully connected to database toDoList")
    }
)

app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post("/authenticateUser", function(req, res) {
    user.findOne({
            _id: req.body.username,
            password: req.body.password
        },

        function(err, data) {
            if (err) {
                console.log("Error in authenticateUser");
                console.log(err);
                res.send(err);
            } else {
                if (data == null) {
                    console.log("invalid username or password");
                    res.send(false);
                } else {
                    console.log("Valid username and password");
                    res.send(true);
                }
            }
        }
    );
})



app.post("/registerUser", function(req, res) {
    user.create({
            _id: req.body.username,
            password: req.body.password
        },

        function(err, data) {
            if (err) {
                console.log(err);
                res.send(false);
            } else {
                console.log("New user created");
                userTasks.create({
                        _id: req.body.username,
                        task: []
                    },

                    function(err, data) {
                        if (err) {
                            console.log("Error in creating entry in userTask collection");
                            res.send(false);
                        } else {
                            console.log("Entry of new user created in userTasks");
                            res.send(true);
                        }
                    }
                )
            }
        }
    )
})

app.post("/findUser", function(req, res) {
    user.findOne({
            _id: req.body.username
        },

        function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("data reciecved in findUser \n" + data);
                res.send(data);
            }
        }
    );
})


app.post("/getUserTasks", function(req, res) {
    userTasks.findOne({
            _id: req.body.username
        },

        function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("data reciecved in findUser \n" + data);
                res.send(data);
            }
        }
    );
})

app.post("/archiveTask", function(req, res) {
    userTasks.findById(req.body.username).then(result => {
        task = result.task;
        dataToBeUpdated = {}
        for (let i = 0; i < task.length; i++) {
            if (req.body.idToBeArchived.includes(String(task[i]._id))) {
                dataToBeUpdated['task.' + i + '.archive'] = !task[i].archive;
                console.log(dataToBeUpdated);
            }
        }

        userTasks.updateOne({
                _id: req.body.username
            },

            {
                $set: dataToBeUpdated
            },

            function(err, result) {
                if (err) {
                    console.log("Error in To Be Archived Function");
                    console.log(err);
                    res.send(false);
                } else
                    res.send(true);
            }
        )
    })
})

app.post("/deleteTask", function(req, res) {
    console.log("Inside Delete Function");
    userTasks.findById(req.body.username).then(result => {
        task = result.task;

        dataToBeDeleted = []
        for (let i = 0; i < task.length; i++) {
            if (req.body.idToBeDeleted.includes(String(task[i]._id))) {
                dataToBeDeleted.push(task[i]._id);
            }
        }

        userTasks.updateMany({
                _id: req.body.username
            },

            {
                $pull: {
                    "task": {
                        _id: {
                            $in: dataToBeDeleted
                        }
                    }
                }
            },

            function(err, result) {
                if (err) {
                    console.log("Error in To Be Deleted Function");
                    console.log(err);
                    res.send(false);
                } else {
                    console.log(result);
                    res.send(true);
                }
            }
        )
    })

})

app.post("/addUserTask", function(req, res) {

    var id = new ObjectId();
    req.body.task._id = id;


    userTasks.updateOne({
            _id: req.body.username
        }, {
            $push: {
                task: req.body.task,
            }
        },
        function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(req.body.task._id);
            }
        }
    );
})

app.post("/changeTaskStatus", function(req, res) {
    userTasks.findById(req.body.username).then(result => {
        task = result.task;
        dataToBeUpdated = {};

        for (let index = 0; index < task.length; index++) {
            const element = task[index];
            if (element._id == req.body.taskId) {
                dataToBeUpdated['task.' + index + '.status'] = req.body.status;
                console.log(dataToBeUpdated);
            }
        }

        userTasks.updateOne({
                _id: req.body.username
            },

            {
                $set: dataToBeUpdated
            },

            function(err, result) {
                if (err) {
                    console.log("Error in Change Status Function");
                    console.log(err);
                    res.send(false);
                } else
                    res.send(true);
            }
        )
    })
})

app.post("/changeTaskPriority", function(req, res) {
    userTasks.findById(req.body.username).then(result => {
        task = result.task;
        dataToBeUpdated = {};

        for (let index = 0; index < task.length; index++) {
            const element = task[index];
            if (element._id == req.body.taskId) {
                dataToBeUpdated['task.' + index + '.priority'] = req.body.priority;
                console.log(dataToBeUpdated);
            }
        }

        userTasks.updateOne({
                _id: req.body.username
            },

            {
                $set: dataToBeUpdated
            },

            function(err, result) {
                if (err) {
                    console.log("Error in Change Priority Function");
                    console.log(err);
                    res.send(false);
                } else
                    res.send(true);
            }
        )
    })
})

app.post("/updateUserTask", function(req, res) {
    userTasks.updateOne({
            _id: req.body.username,
            "task._id": req.body.task._id
        }, {
            $set: {
                "task.$": req.body.task,
            }
        },
        function(err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(true);
            }
        }
    );
})

app.listen(8080, () => console.log("Api is running"));