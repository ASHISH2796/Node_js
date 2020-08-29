const User =require('../models/user');
const Post =require('../models/post');
const mapBoxToken =process.env.MAPBOX_TOKEN;
const passport =require('passport');

module.exports ={
    async landingPage(req,res,next){
      let posts = await Post.find({});
      res.render('index',{posts,mapBoxToken,title: 'Surf Shop - Home' });
    },
    getRegister(req,res,next){
       res.render('register', {title:'Register'});
    },
    async postRegister(req,res,next){
        const newUser =new User({
            username:req.body.username,
            email: req.body.email,
            image: req.body.image
        }); 
        let user =await User.register( newUser,req.body.password);
        req.login(user ,function(error) {
            if(error) return next(error);
            req.session.success =`Welcome to Surf-shop, ${user.username}!`;
            res.redirect('/');
        });
    } ,
    getLogin(req,res,next){
        res.render('login', {title:'Login'});
     },
    postLogin(req,res,next){
        passport.authenticate('local' , { 
            successRedirect: '/',
            failureRedirect: '/login'
         })(req,res,next); 
    },
    getLogout(req, res, next) {
            req.logOut();
            res.redirect('/');
    }
}