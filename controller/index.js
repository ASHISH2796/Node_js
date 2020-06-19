const User =require('../models/user');
const user = require('../models/user');

module.exports ={
    postRegister(req,res,next){
        User.register( new User({username:req.body.username}),req.body.password,(err)=>{
            if(err){
                console.log('Error while user register!',err);
                return next(err);
            }
            console.log('user register!');
            res.redirect('/');
        })
    }
}