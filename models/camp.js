var mongoose=require("mongoose");
var campSchema = new mongoose.Schema({
    name:String,
    price:String,
    img:String,
    des:String,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
        }],
        author:{
        id:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
        }
});
var Camp = mongoose.model("Camp",campSchema);
module.exports= Camp;