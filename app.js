var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const mongoose = require('mongoose')
const cors= require('cors')
var multer  = require('multer');
var nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
app.use(express.static('./public'));
app.use(cors())

app.use(logger('dev'));
mongoose.connect('mongodb://localhost/pfe',{useNewUrlParser : true , useUnifiedTopology: true},(err)=>{
  if(err){
    console.log(err)
    return
  }else{
    console.log("connected to db")
  }
})
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
