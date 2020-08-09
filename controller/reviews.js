const Post = require('../models/post');
const Review =require('../models/review');

module.exports ={
    //Create review
    async reviewCreate(req,res,next){
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        let hasReviewed =post.reviews.filter(review => {
            return review.author.equals(req.user._id);
        }).length;

        if(hasReviewed)
        {
            req.session.error ="Sorry you have already given a review. ";
            return res.redirect(`/post/${post.id}`);
        }
        req.body.review.author =req.user._id;//Set user name 
       // console.log("req.body.review.author :"+req.body.review.author);
        let review =await Review.create(req.body.review);
        post.reviews.push(review);
        post.save();
        req.session.success ='Review Creates Successfully !';
        res.redirect(`/post/${post.id}`);
    },
    //Update Review
    async reviewUpdate(req,res,next){
        await Review.findByIdAndUpdate(req.params.review_id,req.body.review);
        req.session.success ='Review Updated Successfully !';
        res.redirect(`/post/${req.params.id}`);
    },
    //Delete Review
    async reviewDelete(req,res,next){
        await Post.findByIdAndUpdate(req.params.id,{
            $pull :{ reviews :req.params.review_id }
        });
        await Review.findByIdAndRemove(req.params.review_id);
        req.session.success ='Review Deleted Sucessfully !';
        res.redirect(`/post/${req.params.id}`);
    }
}