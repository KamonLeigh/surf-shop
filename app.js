const createError = require('http-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user');



// Require routes 
const index = require('./routes/index');
const reviews = require('./routes/reviews')
const posts = require('./routes/posts')

const app = express();

// Connect to the data base 
  mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}).then(() => {
    console.log('Connected to the database');
  }).catch( err => {
    console.log('Error', err);
  });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Configure Passport and Sessions
app.use(session({
  secret: 'hang ten dude',
  resave: false,
  saveUninitialized: true,
}));



passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
