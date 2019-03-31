const express = require('express');
const router = express.Router();
const { 
        postRegister,
        getRegister, 
        postLogin, 
        getLogin,
        getLogout, 
        landingPage } = require('../controllers');
const {asyncErrorHandler} = require('../middleware');

/* GET home/ landing  page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register. */
router.get('/register',getRegister );

/* POST /register. */
router.post('/register', asyncErrorHandler(postRegister));

/* GET / register.*/
router.get('/login', getLogin);

/* POST / register.*/
router.post('/login', asyncErrorHandler(postLogin));
 

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

// /*GET /reset-password *å/
 router.put('/reset/:token', (req, res, next) => {
  res.send('GET/forgot-password');
});




module.exports = router;


