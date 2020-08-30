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
       res.render('register', {title:'Register',username:'',email:''});
    },
    async postRegister(req,res,next){
        // const newUser =new User({
        //     username:req.body.username,
        //     email: req.body.email,
        //     image: req.body.image
        // }); 
        try{
            const user =await User.register( new User(req.body),req.body.password);
            req.login(user ,function(err) {
                if(err) return next(err);
                req.session.success =`Welcome to Surf-shop, ${user.username}!`;
                res.redirect('/');
            });
        }
        catch(err){
            const {username,email} =req.body;
            let error =err.message;
            if(error.includes('duplicate') &&  error.includes('index: email_1 dup key')){
                error ='A user with the given email is already registered';
            }
            res.render('register',{title: 'Register', username,email,error});
        }
       
    } ,
    getLogin(req,res,next){
        if(req.isAuthenticated()) return res.redirect('/');
        if(req.query.returnTo) req.session.redirectTo =req.headers.referer;
        console.log(req.session.redirectTo);
        res.render('login', {title:'Login'});
     },
    async postLogin(req,res,next){

        // passport.authenticate('local' , { 
        //     successRedirect: '/',
        //     failureRedirect: '/login'
        //  })(req,res,next);
        
         const {username,password} =req.body;
         const {user ,error} =await User.authenticate()(username,password);
         if(!user && error) return next(error);
         req.login(user,function(err) {
             if(err) return next(err);
             req.session.success =`Welcome Back , ${username}`;
             const redirectUrl =req.session.redirectTo || '/';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
         });
        
    },
    getLogout(req, res, next) {
            req.logOut();
            res.redirect('/');
    }
}