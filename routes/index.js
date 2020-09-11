const express = require('express');
const router = express.Router();
const { postRegister ,postLogin ,getLogout, landingPage,getRegister,getLogin,getProfile,updateProfile,getForgotpwd,putForgotpwd,getReset,putReset} =require('../controller/index');
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
router.get('/forgot-password', getForgotpwd);

/* PUT forgot-pw page. */
router.put('/forgot-password', asyncErrorHandler(putForgotpwd));

/* GET reset-pw/:token page. */
router.get('/reset/:token',asyncErrorHandler(getReset));

/* PUT reset-pw/:token page. */
router.put('/reset/:token', asyncErrorHandler(putReset));

module.exports = router;
