const express = require('express');
const router = express.Router({mergeParams:true});
const {
  reviewCreate,
  reviewUpdate,
  reviewDelete
} = require('../controller/reviews');
const {asyncErrorHandler } =require('../middleware');

/* POST  reviews create /post/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));
  /* PUT reviewss update /reviews/:review_id */
  router.put('/:review_id', asyncErrorHandler(reviewUpdate));
/* GET reviews index /reviews */
  router.delete('/:review_id', (req, res, next)=>{
    res.send("in reviews routes delete /post/:id//reviews/:review_id");
  });

  module.exports = router;
  
