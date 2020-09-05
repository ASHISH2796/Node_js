const express = require('express');
const router = express.Router();
const { postRegister ,postLogin ,getLogout, landingPage,getRegister,getLogin,getProfile,updateProfile} =require('../controller/index');
const { asyncErrorHandler,isLoggedIn,isValidPassword ,changePassword } =require('../middleware/index');
const multer =require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

/* GET home landing page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET register page. */
router.get('/register', getRegister);

/* POST register page. */
router.post('/register',upload.single('image'),asyncErrorHandler(postRegister));

/* GET login page. */
router.get('/login',getLogin);

/* POST login page. */
router.post('/login',asyncErrorHandler(postLogin));

/* GET logout page. */
router.get('/logout', getLogout);
/* GET profile page. */
router.get('/profile',isLoggedIn, asyncErrorHandler(getProfile));

/* PUT profile page. */
router.put('/profile/:user_id',isLoggedIn,upload.single('image'), asyncErrorHandler(isValidPassword),asyncErrorHandler(changePassword),asyncErrorHandler(updateProfile));

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
