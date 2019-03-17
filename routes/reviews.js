const express = require('express');
const router = express.Router({mergeParams: true});


/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
    res.send('/reviews');
});



/* post reviews index /posts/:id/reviews */
router.post('/', (req, res, next) => {
    res.send('/reviews/new');
});


/* GET reviews edit /posts/:id/reviews/:id*/
router.get('/:review_id/edit', (req, res, next) => {
    res.send('/reviews/:review_id/edit');
});

/* PUT reviews update /posts/:id/reviews/:id*/
router.put('/:review_id', (req, res, next) => {
    res.send('/reviews/:review_id');
});


/* Delete reviews destroy /posts/:id/reviews/:id*/
router.delete('/:id/', (req, res, next) => {
    res.send('/reviews/:id');
});


module.exports = router;


