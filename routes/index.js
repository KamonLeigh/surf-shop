const express = require('express');
const passport = require('passport');
const router = express.Router();
const { postRegister } = require('../controllers');
const { errorHandler } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop -Home' });
});

/* GET /register. */
router.get('/register', (req, res, next) => {
  res.send('GET /register' );
});

/* POST /register. */
router.post('/register', errorHandler(postRegister));

/* GET / register.*/
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST / register.*/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
 

/* GET / logout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

/* GET / profile.*/
router.get('/profile', (req, res, next) => {
  res.send('POST /login');
});


/*PUT /profile:user_id */
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT/ profile');
});


/*GET /forgot-password */
router.get('/forgot', (req, res, next) => {
  res.send('GET/forgot-password');
});

/*PUT /forgot-password */
router.put('/forgot', (req, res, next) => {
  res.send('GET/forgot-password');
});


/*GET /reset-password */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET/forgot-password');
});

/*GET /reset-password */
router.put('/reset/:token', (req, res, next) => {
  res.send('GET/forgot-password');
});




module.exports = router;
