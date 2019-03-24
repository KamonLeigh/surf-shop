const express = require('express');
const router = express.Router({mergeParams: true});
const { asyncErrorHandler, isReviewAuthor} = require('../middleware');
const { reviewCreate, reviewUpdate, reviewDestroy} = require('../controllers/reviews');





/* post reviews index /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));


/* PUT reviews update /posts/:id/reviews/:id*/
router.put('/:review_id',isReviewAuthor ,asyncErrorHandler(reviewUpdate));


/* Delete reviews destroy /posts/:id/reviews/:id*/
router.delete('/:review_id/',isReviewAuthor, asyncErrorHandler(reviewDestroy));


module.exports = router;


