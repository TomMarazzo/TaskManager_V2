var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//ROUTES FROM CONTROLLERS
var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
//Lesson 5
var tasksRouter = require('./controllers/tasks');

var app = express();

//Database try to connect and log a result
const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,  //Change test at the end to tasks-v2, and password
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(
    (res) => {
      console.log('Connected to MongoDB')
    }
).catch(() => {
  console.log('No Connection to MongoDB')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//URLs starting with tasks to the tasks controller
app.use('/tasks', tasksRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
