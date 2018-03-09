var express=require("express"),
router=express.Router();
var Camp= require("../models/camp");
var middle=require("../middleware");
router.get("/",function(req,res){
    
    Camp.find({},function(err,camps){
        if(err){
            console.log("there is an errror"+err);
        }
        else{
            res.render("camps/index",{camps:camps , nwuser:req.user});
        }
    });
    
});
router.post("/",middle.isLoggedIn,function(req,res){
    var name = req.body.campName;
    var img = req.body.campImg;
    var des= req.body.campdes,
    price = req.body.campPrice;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newP={name:name,img:img,des:des,author,price:price};
    Camp.create(newP,function(err,newcamp){
        if(err){
            console.log("error");
        }
        else
        {
            res.redirect("/campg");
        }
    });
    
});
router.get("/add",middle.isLoggedIn,function(req, res) {
    res.render("camps/addnew");
});
router.get("/:id",function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(error, foundCamp) {
        if(error){
            console.log(error);
        }
        else{
            res.render("camps/show",{campground:foundCamp});
        }
    });
 
});
router.get("/:id/edit",middle.checking,function(req, res) {
    Camp.findById(req.params.id,function(err,foundCamp){
        if(err){
            res.redirect("/");
        }
        else
        {
             res.render("camps/edit",{camp:foundCamp}); 
        }
    });
  
});
router.put("/:id",middle.checking,function(req,res){
   Camp.findByIdAndUpdate(req.params.id,req.body.camp,function(err,upcamp){
       if(err){
           res.redirect("/");
       }
       else{
           res.redirect("/campg/"+req.params.id);
       }
   }) ;
});
router.delete("/:id",middle.checking,function(req,res){
   Camp.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log(err);
           
       }
       req.flash("success","it's deleted");
       res.redirect("/campg");
   }); 
});
   
   
module.exports= router;