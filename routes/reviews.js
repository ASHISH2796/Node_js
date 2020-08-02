const express = require('express');
const router = express.Router({mergeParams:true});

/* POST  reviews create /post/:id/reviews */
router.post('/', (req, res, next)=>{
    res.send("in create routes create : /post/:id/reviews ");
  });
  /* PUT reviewss update /reviews/:review_id */
  router.put('/:review_id', (req, res, next)=>{
    res.send("in reviews routes update : /reviews/:review_id");
  });
/* GET reviews index /reviews */
  router.delete('/:review_id', (req, res, next)=>{
    res.send("in reviews routes delete /post/:id//reviews/:review_id");
  });

  module.exports = router;
  
