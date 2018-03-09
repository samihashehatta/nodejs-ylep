var express=require("express"),
router=express.Router({mergeParams:true});
var Camp= require("../models/camp"),
Comment=require("../models/comment");
var middle=require("../middleware");


router.get("/new",middle.isLoggedIn,function(req, res) {
       Camp.findById(req.params.id,function(err,camp){
           if(err){
               console.log("err")
           }
           else
           {
                res.render("comments/addnew",{camp:camp});
           }
       })
       
    });
router.post("/",middle.isLoggedIn,function(req,res){
    Camp.findById(req.params.id,function(err, camp) {
        if(err)
        {
            req.flash("error","you fucked up in ")
            console.log("err")
        }
        else
        {
            Comment.create(req.body.comment,function(err,commentt){
                if(err)
                {
                    console.log("er")
                }
                else
                {
                    commentt.author.id=req.user._id;
                    commentt.author.username=req.user.username;
                    commentt.save();
                     camp.comments.push(commentt._id);
                     camp.save();
                     req.flash("success","added comment")
                     res.redirect("/campg/"+req.params.id);
                }
            });
           
            
        }
    });
   
});
router.get("/:comm_id/edit",middle.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comm_id,function(err, comment) {
        if(err){
            res.redirect("back");
        }
        else
        {
             res.render("comments/edit",{camp_id:req.params.id,comment:comment});
        }
    });
   
});
router.put("/:comm_id",middle.checkCommentOwnership,function(req,res){
     Comment.findByIdAndUpdate(req.params.comm_id,req.body.comment,function(err,found){
     if(err){
      res.redirect("/");
       }
       else
       {
           res.redirect("/campg/"+req.params.id);
       }
  }) ;

});
router.delete("/:comm_id",middle.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comm_id,function(err){
        if(err){
            res.redirect("/");
        }
        res.redirect("/campg/"+req.params.id);
    });
});
    
    module.exports=router;