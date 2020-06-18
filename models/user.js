const mongoose = require('mongoose');
const passportLocalMangoose =require('passport-local-mangoose');
const Schema =mongoose.Schema;

const UserSchema =new Schema({
    email:String,
    image:String,
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
        ]
});
UserSchema.plugin(passportLocalMangoose);

module.exports =mongoose.model('User',UserSchema);