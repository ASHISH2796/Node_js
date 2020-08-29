const Review = require('../models/review');
const User = require('../models/user');
//const { session } = require('passport');

module.exports = {
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
    isCheckUserExists: async(req,res,next)=>{
        let isUserExists =await User.findOne({'email':req.body.email});
        if(isUserExists){
            req.session.error ='A user with the given email is already registered';
            return res.redirect('back');
        } 
        next();
    }


}