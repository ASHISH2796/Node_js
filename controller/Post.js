const Post = require('../models/post');

module.exports ={
    async getPost(req,res,next){
        let posts =await Post.find({});
        res.render('posts/index',{posts});
    },
    
    newPost(req,res,next){
        res.render('posts/new');
        },
        
    async createPost(req,res,next){
            let post =await Post.create(req.body);
            res.redirect(`/post/${post.id}`);
    }  
        
}