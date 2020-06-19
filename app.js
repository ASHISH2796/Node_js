const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport =require('passport');
const User =require('./models/user');
const session=require('express-session');
const mongoose =require('mongoose');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/reviews');
//const { session } = require('passport');

const app = express();

//Db connection 
mongoose.connect('mongodb://192.168.99.100:27017/surf-shop',{ use
NewUrlParser: true });

const db =mongoose.connection;
db.on('error',console.error.bind(console ,'connection error:'));
db.once('open',()=>{
  console.log('we are connected!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure passport and session 
app.use(session({
  secret : 'hang ten dude!',
  resave:false,
  saveUninitialized:true
}));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/post',postRouter);
app.use('/post/:id/reviews',reviewRouter);

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
