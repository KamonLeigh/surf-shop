const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const { asyncErrorHandler, isLoggedIn, isAuthor, searchAndFilterPosts,} = require('../middleware');
const { postIndex, 
        postNew, 
        postCreate,
        postShow,
        postEdit,
        postUpdate,
        postDelete,
    } = require('../controllers/post');


/* GET posts index /posts */
router.get('/', asyncErrorHandler(searchAndFilterPosts), asyncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', isLoggedIn ,postNew);

/* post posts index /posts */
router.post('/',isLoggedIn ,upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id*/
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id*/
router.get('/:id/edit', isLoggedIn, asyncErrorHandler(isAuthor), postEdit);

/* PUT posts update /posts/:id*/
router.put('/:id', isLoggedIn, asyncErrorHandler(isAuthor),upload.array('images', 4), asyncErrorHandler(postUpdate));


/* Delete posts destroy /posts/:id*/
router.delete('/:id/', isLoggedIn, asyncErrorHandler(isAuthor),asyncErrorHandler(postDelete));



module.exports = router;


/*

GET index       /posts
GET new         /posts/new
POST create     /posts
GET show        /posts/:id
GET edit        /posts/:id/edit
PUT update      /posts/:id
DELETE destroy  /posts/:id


*/
