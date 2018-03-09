var middleObj ={};
var Camp= require("../models/camp"),
Comment=require("../models/comment");

middleObj.checkCommentOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comm_id, function(err, foundComment){
           if(err){
               res.redirect("/login");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","you dont have prem to do that ");
                res.redirect("/login");
            }
           }
        });
    } else {
        req.flash("error","you need to be logged in ");
        res.redirect("/login");
    }

}
middleObj.isLoggedIn=function(req,res,next){
        if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","please login first");
    res.redirect("/login")
;    
    
}
middleObj.checking = function(req, res, next) {
 if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp){
           if(err){
               req.flash("error","u fucked up ")
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCamp.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","you dont have prem to do that ");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","you need to be logged in ")
        res.redirect("back");
    }
}

module.exports=middleObj;