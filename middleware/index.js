const Review = require('../models/review');
const { session } = require('passport');

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
    }


}