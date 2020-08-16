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
        ],
        avgRating : {
            type: Number,
            default :0
        }
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

PostSchema.methods.calculateAvgRating = function(){
   let ratingcal =0;
   if(this.reviews.length)
   {   
    this.reviews.forEach(element => {
       ratingcal = ratingcal + element.rating;    
    });
    this.avgRating=Math.round((ratingcal/this.reviews.length)*10)/10;
   }
   else {
    this.avgRating = ratingcal;
   }
   const avgFloorRating =Math.floor(this.avgRating);
   this.save();
   return avgFloorRating;
}
PostSchema.plugin(mongoosePaginate); // for pagination
module.exports =mongoose.model('Post' ,PostSchema);