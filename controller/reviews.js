const Post = require('../models/post');
const Review =require('../models/review');

module.exports ={
    //Create review
    async reviewCreate(req,res,next){
        let post = await Post.findById(req.params.id);
        req.body.review.author =req.user._id;//Set user name 
       // console.log("req.body.review.author :"+req.body.review.author);
        let review =await Review.create(req.body.review);
        post.reviews.push(review);
        post.save();
        req.session.success ='Review Creates Successfull !';
        res.redirect(`/post/${post.id}`);
    },
    //Update Review
    async reviewUpdate(req,res,next){
        await Review.findByIdAndUpdate(req.params.review_id,req.body.review);
        res.redirect(`/post/${req.params.id}`);
    },
    //Delete Review
    async reviewDelete(req,res,next){

    }
}