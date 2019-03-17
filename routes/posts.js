const express = require('express');
const router = express.Router();


/* GET posts index /posts */
router.get('/', (req, res, next) => {
  res.send('/posts');
});

/* GET posts new /posts/new */
router.get('/new', (req, res, next) => {
  res.send('/posts/new');
});

/* post posts index /posts */
router.post('/', (req, res, next) => {
    res.send('/posts/new');
});

/* GET posts show /posts/:id*/
router.get('/:id', (req, res, next) => {
    res.send('/posts/:id');
});

/* GET posts edit /posts/:id*/
router.get('/:id/edit', (req, res, next) => {
    res.send('/posts/:id/edit');
});

/* PUT posts update /posts/:id*/
router.put('/:id', (req, res, next) => {
    res.send('/posts/:id');
});


/* Delete posts destroy /posts/:id*/
router.delete('/:id/', (req, res, next) => {
    res.send('/posts/:id');
});


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
