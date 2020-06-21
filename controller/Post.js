const Post = require('../models/post');

module.exports ={
    getPost(req,res,next){
        let posts =Post.find({});
        res.render('posts/index',{posts});
    }
}