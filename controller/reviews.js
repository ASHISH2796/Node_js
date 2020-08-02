const Post = require('../models/post');
const Review =require('../models/review');

module.exports ={
    //Create review
    async reviewCreate(req,res,next){
        let post = await Post.findById(req.params.id);
        let review =await Review.create(req.body.review);
        post.reviews.push(review);
        post.save();
        req.session.success ='Review Creates Successfull !';
        res.redirect(`/post/${post.id}`);
    },
    //Update Review
    async reviewUpdate(req,res,next){

    },
    //Delete Review
    async reviewDelete(req,res,next){

    }
}