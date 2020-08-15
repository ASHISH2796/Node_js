require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate'); //layout 
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport =require('passport');
const User =require('./models/user');
const session=require('express-session');
const mongoose =require('mongoose');
const methodOverride = require('method-override');
// const seedPosts =require('./seeds');
// seedPosts(); // added to test  pagination to create dummy data 

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/reviews');
//const { session } = require('passport');

const app = express();

//Db connection 
mongoose.connect('mongodb://192.168.99.100:27017/surf-shop',{ useNewUrlParser: true });

const db =mongoose.connection;
db.on('error',console.error.bind(console ,'connection error:'));
db.once('open',()=>{
  console.log('we are connected!');
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set public asses directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Configure passport and session 
app.use(session({
  secret : 'hang ten dude!',
  resave:false,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set local variable middleware
app.use(function(req,res,next){
  req.user={
    '_id' : '5f2e7bcc1e2e0832d85211ad',
    'username' : 'Ashish'
  }
  res.locals.currentUser= req.user;
  res.locals.title ='Surf-Shop';
  //set success message
  res.locals.success =req.session.success || '' ;
  delete req.session.success;

  //set error message
  res.locals.error =req.session.error || '';
  delete req.session.error;

  next();
});

app.use('/', indexRouter);
app.use('/post',postRouter);
app.use('/post/:id/reviews',reviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("req"+req);
  console.log("res"+res);
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  req.session.error = err.message;
  res.redirect('back');
});

module.exports = app;
