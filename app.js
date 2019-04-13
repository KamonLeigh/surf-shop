require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
 const seedPosts = require('./seeds');
//  seedPosts();
// const User = require('./models/user');

const app = express();




// Require routes 
const index = require('./routes/index');
const reviews = require('./routes/reviews')
const posts = require('./routes/posts')


// Connect to the data base 
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  }).then(() => {
  console.log('Connected to the database');
}).catch( err => {
  console.log('Error', err);
});

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setup public asserts directory
app.use(express.static('public'));

app.use(favicon(path.join(__dirname,'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));




// Configure Passport and Sessions
app.use(session({
  secret: 'hang ten dude',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// set local variables middleware
app.use(function (req, res, next) {

  // req.user = {
  //   '_id': '5c9667781256602bf51a12bc',
  //   'username': 'ian',

  // }

  // req.user = {
  //   '_id': '5c96b0b80181482e5fcafd94',
  //   'username': 'ian2',

  // }

  // req.user = {
  //   '_id': '5c99011648ee283b3f4daa50',
  //   'username': 'ian3',

  // }


  res.locals.currentUser = req.user;

  res.locals.title = 'Surf Shop';

  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success;

  // set error flash message
  res.locals.error = req.session.error|| '';
  delete req.session.error;
  next();
});
// Mount routes
app.use('/', index);
app.use('/posts', posts);
app.use('/posts/:id/reviews', reviews);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
