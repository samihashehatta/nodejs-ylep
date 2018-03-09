var mongoose=require("mongoose");
var mongooosePassportLocal=require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
   name:String,
   password:String
});
userSchema.plugin(mongooosePassportLocal);
var User = mongoose.model("User",userSchema);

module.exports=User;