const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const Review =require('./review');
const mongoosePaginate =require('mongoose-paginate');

const PostSchema = new Schema(
    {
        title:String,
        price:String,
        description:String,
        images:[{
            url:String,
            public_id:String
        }],
        location :String,
        coordinates:Array,
        author:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        reviews :[
            {
                type:Schema.Types.ObjectId,
                ref:'Review'
            }
        ]
    }
); 
//add code to  remove review if post deleted it will be called when .remove is called on post
PostSchema.pre('remove' , async function() {
    await Review.remove({
        _id :{
            $in:this.reviews
        }
    });
});
PostSchema.plugin(mongoosePaginate); // for pagination
module.exports =mongoose.model('Post' ,PostSchema);