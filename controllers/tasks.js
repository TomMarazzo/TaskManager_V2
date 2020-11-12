///////// TASK CONTROLLER /////////////////

//set up routing with Express
const express = require('express')
const router = express.Router()

//Reference Task Model
const Task = require('../models/task')

//Get tasks index view
router.get('/', (req, res, next) => {
    //use the task model to fetch a list of tasks and pass these to the view display
    //if err, the err parameter will be filled
    //if not, the task parameter will be filled with the query result
    Task.find((err, tasks) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.render('tasks/index',
                {
                    tasks: tasks
                })
        }
    })
})
//GET tasks add view
router.get('/add', (req, res, next) => {
    res.render('tasks/add')
})

//POST tasks/add for submission
router.post('/add', (req, res, next) =>
{
    Task.create({
        name: req.body.name,
        priority: req.body.priority
    }, (err, task) => {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            res.redirect('/tasks')
        }
    })
})

//GET tasks/delete/abc
//GET tasks/delete/ - colon in the path represents a URL parameter
router.get('/delete/:_id', (req, res, next) => {
    //store the selected id in a local variable
    var _id = req.params._id;
    //Use Mongoose to delete the selected document from the DB
    Task.remove({ _id: _id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/tasks')
        }
    })
})


//Make Controller Public
module.exports = router