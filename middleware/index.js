const Review = require('../models/review');
const User = require('../models/user');
const Post =require('../models/post');
const { session } = require('passport');
//const { session } = require('passport');
const { cloudinary } = require('../cloudinary');

const middleware = {
    asyncErrorHandler: (fn) =>
        (req, res, next) =>{
            Promise.resolve(fn(req ,res ,next))
                    .catch(next);
        
    },
    isReviewAuthor : async (req,res,next) =>{
        let review = await Review.findById(req.params.review_id);
        console.log(review);
        if(review.author.equals(req.user._id)){
            return next();
        }
        req.session.error ='Your  Unathorize to update Review!';
        return res.redirect('/');
    },
    // isCheckUserExists: async(req,res,next)=>{
    //     let isUserExists =await User.findOne({'email':req.body.email});
    //     if(isUserExists){
    //         req.session.error ='A user with the given email is already registered';
    //         return res.redirect('back');
    //     } 
    //     next();
    // }
   isLoggedIn(req,res,next){
        if(req.isAuthenticated()) return next();
        req.session.error="You need to be logged in to do that.";
        req.session.redirectTo =req.originalUrl;
        //console.log("req.OriginalUrl" +req.originalUrl);
        res.redirect('/login');
   },
   isAuthor: async (req,res,next)=>{
    let post = await Post.findById(req.params.id);
    if(post.author.equals(req.user._id)){
        console.log(post);
        res.locals.post= post;
        return next();
    }
    req.session.error ='Access denied !';
    res.redirect('back');
   },
   isValidPassword: async (req,res,next)=>{
     const {user}=await User.authenticate()(req.user.username,req.body.currentPassword);
        if(user)
        {  
            res.locals.user =user;
            next();
        }
        else
        {
            middleware.deleteProfileImage(req);
            req.session.error="Incorrect Username or Password!";
            return res.redirect('/profile');
        }
   },
   changePassword : async (req,res,next)=>{
        const {newPassword,passwordConfirmation} =req.body;
        if(newPassword && !passwordConfirmation)
        {
            middleware.deleteProfileImage(req);
            req.session.error="Confirmation password missing!"
            res.redirect('/profile');
        }
        if(newPassword && passwordConfirmation){
            const {user} =res.locals;
            if(newPassword=== passwordConfirmation){
                await user.setPassword(newPassword);
                next();
            }
            else
            {
                middleware.deleteProfileImage(req);
                req.session.error ="Incorrect confirmation Password !";
                res.redirect('/profile');
            }
        }
        else {
            next();
        } 
   },

   deleteProfileImage : async (req) =>{
       if(req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
   }

};
module.exports =middleware;