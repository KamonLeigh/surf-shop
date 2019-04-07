const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { 
        postRegister,
        getRegister, 
        postLogin, 
        getLogin,
        getLogout, 
        landingPage,
        getProfile,
        updateProfile,
        getForgotPw,
        putForgotPw,
        putReset,
        getReset
      
      } = require('../controllers');

const {asyncErrorHandler, isLoggedIn, isValidPassword, changePassword} = require('../middleware');

/* GET home/ landing  page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register. */
router.get('/register',getRegister );

/* POST /register. */
router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

/* GET / register.*/
router.get('/login', getLogin);

/* POST / register.*/
router.post('/login', asyncErrorHandler(postLogin));
 

/* GET / logout */
router.get('/logout', getLogout);

/* GET / profile.*/
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));


/*PUT /profile*/
router.put('/profile', 
    isLoggedIn,
    upload.single('image'),
    asyncErrorHandler(isValidPassword),
    asyncErrorHandler(changePassword),
    asyncErrorHandler(updateProfile)
  );


/*GET /forgot-password */
router.get('/forgot-password', getForgotPw);

/*PUT /forgot-password */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));


/*GET /reset-password */
router.get('/reset/:token', asyncErrorHandler(getReset));

// /*GET /reset-password *å/
 router.put('/reset/:token', asyncErrorHandler(putReset));




module.exports = router;


