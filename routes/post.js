const express = require('express');
const { 
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit
      } = require('../controller/Post');
const {asyncErrorHandler } =require('../middleware');
const router = express.Router();

/* GET posts index /post */
router.get('/', asyncErrorHandler(postIndex));
/* GET posts  new /post/new */
router.get('/new', postNew);
/* POST posts create /post */
router.post('/',asyncErrorHandler(postCreate));
/* GET posts  show /post/:id */
router.get('/:id', asyncErrorHandler(postShow));
/* GET posts edit /post/:id/edit */
  router.get('/:id/edit',asyncErrorHandler(postEdit));
  /* PUT posts update /post/:id */
  router.put('/:id', (req, res, next)=>{
    res.send("in post routes update : /:id");
  });
/* GET Post index /post */
  router.delete('/:id', (req, res, next)=>{
    res.send("in post routes delete :id /:id");
  });

  module.exports = router;
  
