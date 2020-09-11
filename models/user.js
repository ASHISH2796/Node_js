const mongoose = require('mongoose');
const passportLocalMangoose =require('passport-local-mongoose');
const Schema =mongoose.Schema;

const UserSchema =new Schema({
    //username:String,
    email : { type: String, unique: true , required:true },
    image: {
        secure_url : {type: String ,  default :'/images/default-profile.jpg'},
        public_id :String
    },
    resetPasswwordToken: String,
    resetPasswwordExpires:Date
});
UserSchema.plugin(passportLocalMangoose);

module.exports =mongoose.model('User',UserSchema);