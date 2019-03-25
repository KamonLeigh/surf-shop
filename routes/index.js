const express = require('express');
const router = express.Router();
const { postRegister, postLogin, getLogout, landingPage } = require('../controllers');
const {asyncErrorHandler} = require('../middleware');

/* GET home/ landing  page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register. */
router.get('/register', (req, res, next) => {
  res.send('GET /register' );
});

/* POST /register. */
router.post('/register', asyncErrorHandler(postRegister));

/* GET / register.*/
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST / register.*/
router.post('/login', postLogin);
 

/* GET / logout */
router.get('/logout', getLogout);

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
