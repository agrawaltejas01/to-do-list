const express = require('express')
const bodyParser = require('body-parser')
var mongo = require('mongoose');
const app = express()

user = require('../schema/user-schema')
userTasks = require('../schema/userTasks-schema')

app.use(bodyParser.json())

var db = mongo.connect('mongodb://localhost:27017/toDoList',
    function (err, response)
    {
        if(err)
            console.log(err);
        
        else
            console.log("Successfully connected to database toDoList")
    }
)

app.use(function (req, res, next) {

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

app.post("/findUser", function(req, res)
{
    user.findOne(
        {
            _id : req.body.username
        },

        function(err, data)
        {
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            
            else
            {
                console.log("data reciecved in findUser \n" + data);
                res.send(data);
            }
        }
    );
})

app.post("/getUserTasks", function(req, res)
{
    userTasks.findOne(
        {
            _id : req.body.username
        },

        function(err, data)
        {
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            
            else
            {
                console.log("data reciecved in findUser \n" + data);
                res.send(data);
            }
        }
    );
})

app.post("/archiveTask", function(req, res)
{   
    console.log("Inside To Be Archived Function");    
    userTasks.findById(req.body.username).then(result =>
        {
            task = result.task;
            dataToBeUpdated = {}
            for(let i = 0; i < task.length; i++ )
            {
                if(req.body.idToBeArchived.includes(String(task[i]._id)))
                {
                    console.log("Found at " + i);
                    dataToBeUpdated['task.'+i+'.archive'] = !task[i].archive;
                    console.log(dataToBeUpdated);
                }
            }

            userTasks.updateOne(
                {
                    _id : req.body.username
                },

                {
                    $set : dataToBeUpdated
                },

                function(err, result)
                {
                    if(err)
                    {
                        console.log("Error in To Be Archived Function");
                        console.log(err);
                        res.send(false);
                    }

                    else
                        res.send(true);
                }
            )
        })
})
app.listen(8080, () => console.log("Api is running"));