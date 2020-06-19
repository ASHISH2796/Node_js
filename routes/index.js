const express = require('express');
const router = express.Router();
const { postRegister } =require('../controller/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.send('GET /register');
});

/* POST register page. */
router.post('/register',postRegister );

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.send('GET /login');
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  res.send('POST /login');
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.send('GET /profile');
});

/* PUT profile page. */
router.put('/profile/:user_id', function(req, res, next) {
  res.send('PUT /profile/:user_id');
});

/* GET forgot-pw page. */
router.get('/forgot-pw', function(req, res, next) {
  res.send('GET /forgot-pw');
});

/* PUT forgot-pw page. */
router.put('/forgot-pw', function(req, res, next) {
  res.send('PUT /forgot-pw');
});

/* GET reset-pw/:token page. */
router.get('/reset-pw/:token', function(req, res, next) {
  res.send('GET /reset-pw/:token');
});

/* PUT reset-pw/:token page. */
router.put('/reset-pw/:token', function(req, res, next) {
  res.send('PUT /reset-pw/:token');
});

module.exports = router;
