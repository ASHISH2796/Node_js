const express = require('express');
const router = express.Router();

/* GET posts index /post */
router.get('/', (req, res, next)=>{
    res.send("in post routes");
  });
/* GET posts  new /post/new */
router.get('/new', (req, res, next)=>{
    res.send("in post routes /new");
  });
/* POST posts create /post */
router.post('/', (req, res, next)=>{
    res.send("in post routes create : /");
  });
/* GET posts  show /post/:id */
router.get('/:id', (req, res, next)=>{
    res.send("in post routes show: /:id");
  });
/* GET posts edit /post/:id/edit */
  router.get('/:id/edit', (req, res, next)=>{
    res.send("in post routes edit : /:id/edit");
  });
  /* PUT posts update /post/:id */
  router.put('/:id', (req, res, next)=>{
    res.send("in post routes update : /:id");
  });
/* GET Post index /post */
  router.delete('/:id', (req, res, next)=>{
    res.send("in post routes delete :id /:id");
  });

  module.exports = router;
  
