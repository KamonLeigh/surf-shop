const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Surf Shop -Home' });
});

/* GET /register. */
router.get('/register', (req, res, next) => {
  res.send('GET /register' );
});

/* POST /register. */
router.post('/register', (req, res, next) => {
  res.send('POST /register');
});

/* GET / register.*/
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST / register.*/
router.post('/login', (req, res, next) => {
  res.send('POST /login');
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
router.get('/forgot-pw', (req, res, next) => {
  res.send('GET/forgot-password');
});

/*PUT /forgot-password */
router.put('/forgot-pw', (req, res, next) => {
  res.send('GET/forgot-password');
});


/*GET /reset-password */
router.get('/reset-pw/:token', (req, res, next) => {
  res.send('GET/forgot-password');
});

/*GET /reset-password */
router.put('/reset-pw/:token', (req, res, next) => {
  res.send('GET/forgot-password');
});




module.exports = router;
