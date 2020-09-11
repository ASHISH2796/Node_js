const User =require('../models/user');
const Post =require('../models/post');
const mapBoxToken =process.env.MAPBOX_TOKEN;
const passport =require('passport');
const util =require('util');
const { cloudinary } = require('../cloudinary');
const {deleteProfileImage} =require('../middleware');
const crypto =require('crypto');
const sgMail =require('@sendgrid/mail');
const { session } = require('passport');
sgMail.setApiKey(process.env.SENDGRID_APIKEY);
const verifiedEmail =process.env.VERIFIED_MAIL_ID;

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
        if(req.file)
        {
            const { secure_url ,public_id} =req.file;
            req.body.image ={secure_url ,public_id};
        } 
        try{
            const user =await User.register( new User(req.body),req.body.password);
            req.login(user ,function(err) {
                if(err) return next(err);
                req.session.success =`Welcome to Surf-shop, ${user.username}!`;
                res.redirect('/');
            });
        }
        catch(err){
            deleteProfileImage(req);
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
    },
    async getProfile(req,res,next){
       let posts = await Post.find().where('author').equals(req.user._id).limit(10).exec();
        res.render('profile',{posts});
    }
    ,
    async updateProfile(req,res,next){
        const {
            username,
            email
        } = req.body;
        const { user } =res.locals;
        if(username) user.username =username;
        if(email) user.email =email;
        console.log(cloudinary.v2);
        if(req.file){
            if(user.image.public_id) await cloudinary.v2.uploader.destroy(user.image.public_id);
            const { secure_url ,public_id} =req.file;
            user.image ={secure_url ,public_id};
        }
        await user.save();
       const login =util.promisify(req.login.bind(req));
       await login(user);
       req.session.success ="Profile successfully Updated!";
       res.redirect('/profile');
    },
    getForgotpwd(req,res,next){
        res.render('users/forgot');
    },
    async putForgotpwd(req,res,next){
        const token = await crypto.randomBytes(20).toString('hex');
        const { email } =req.body;
        const user = await User.findOne({email});
        if(!user){
            req.session.error='No account with that email !';
            return res.redirect('/forgot-password');
        }
        user.resetPasswwordToken=token;
        user.resetPasswwordExpires=Date.now() + 3600000; //after 1 hrs
        await user.save();
        const msg = {
            to: email,
            from: `Surf-Shop Admin ${verifiedEmail}`, // Use the email address or domain you verified above
            subject: 'Surf Shop -- Forgot password / Reset',
            text: `You are receving this because reqested ofr password Reset link
            http://${req.headers.host}/reset/${token} please Ignore if u havent `.replace('/            /g','') ,
            //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          await sgMail.send(msg);
          req,session.success=`An email has been sent to ${email}`;
          res.redirect("/forgot-password");
    },
    async getReset(req,res,next){
        const {token} =req.params;
        const user =await User.findOne({
            resetPasswwordToken:token,
            resetPasswwordExpires: {$gt: Date.now() } //$gt greater check
        });
        if(!user){
            req.session.error='Password reset token is invalid or expired !';
            return res.redirect('/forgot-password');
        }

        res.render('users/reset' ,{token});
    },
    async putReset(req,res,next){
        const {token} =req.params;
        const user =await User.findOne({
            resetPasswwordToken:token,
            resetPasswwordExpires: {$gt: Date.now() } //$gt greater check
        });
        if(!user){
            req.session.error='Password reset token is invalid or expired !';
            return res.redirect('/forgot-password');
        }

        if(req.body.password===req.body.confirm){
            await user.setPassword(req.body.password);
            user.resetPasswwordExpires = null;
            user.resetPasswwordToken =null;
            await user.save();
            
            const login =util.promisify(req.login.bind(req));
            await login(user);
        }
        else {
            req.session.error ='Password do not match with confirm password!'
            return res.redirect(`/reset/${token}`);
        }

        const msg = {
            to: user.email,
            from: `Surf Shop Admin ${verifiedEmail}`,
            subject: 'Surf Shop - Password Changed',
            text: `Hello,
                  This email is to confirm that the password for your account has just been changed.
                  If you did not make this change, please hit reply and notify us at once.`.replace(/                  /g, '')
          };
          await sgMail.send(msg);

          req.session.success = 'Password successfully updated!';
          res.redirect('/');
    }
    

    
}