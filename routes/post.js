const express = require('express');
const router = express.Router();
const multer =require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage });

const { 
  postIndex,
  postNew,
  postCreate,
  postShow,
  postEdit,
  postUpdate,
  postDelete
      } = require('../controller/Post');
const {asyncErrorHandler } =require('../middleware');

/* GET posts index /post */
router.get('/', asyncErrorHandler(postIndex));
/* GET posts  new /post/new */
router.get('/new', postNew);
/* POST posts create /post */
router.post('/',upload.array('images', 4), asyncErrorHandler(postCreate));
/* GET posts  show /post/:id */
router.get('/:id', asyncErrorHandler(postShow));
/* GET posts edit /post/:id/edit */
router.get('/:id/edit',asyncErrorHandler(postEdit));
/* PUT posts update /post/:id */
router.put('/:id',upload.array('images', 4), asyncErrorHandler(postUpdate));
/* GET Post delete /post */
  router.delete('/:id', asyncErrorHandler(postDelete));

  module.exports = router;
  
