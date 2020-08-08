const mongoose = require('mongoose');
const passportLocalMangoose =require('passport-local-mongoose');
const Schema =mongoose.Schema;

const UserSchema =new Schema({
    username:String,
    image:String
});
UserSchema.plugin(passportLocalMangoose);

module.exports =mongoose.model('User',UserSchema);