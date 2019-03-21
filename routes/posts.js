const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({'dest': 'uploads/'})
const { asyncErrorHandler} = require('../middleware');
const { postIndex, 
        postNew, 
        postCreate,
        postShow,
        postEdit,
        postUpdate,
        postDelete
    } = require('../controllers/post');


/* GET posts index /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET posts new /posts/new */
router.get('/new', postNew);

/* post posts index /posts */
router.post('/', upload.array('images', 4), asyncErrorHandler(postCreate));

/* GET posts show /posts/:id*/
router.get('/:id', asyncErrorHandler(postShow));

/* GET posts edit /posts/:id*/
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT posts update /posts/:id*/
router.put('/:id', upload.array('images', 4), asyncErrorHandler(postUpdate));


/* Delete posts destroy /posts/:id*/
router.delete('/:id/', asyncErrorHandler(postDelete));



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
