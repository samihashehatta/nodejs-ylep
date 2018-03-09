var express=require("express"),
router=express.Router();
var User=require("../models/user"),
passport=require("passport");

router.get("/",function(req,res){
    res.render("land");
});




router.get("/register",function(req, res) {
    res.render("register");
});
router.post("/register",function(req, res) {

  User.register(new User({username:req.body.username}),req.body.password,function(err,user){
     if(err){
        req.flash("error", err.message);
         res.render("register");
     }
     passport.authenticate("local")(req, res, function(){
         req.flash("success","Welcome to our website ");
         res.redirect("/campg");
     });
  }) ;
});
router.get("/login",function(req, res) {
    res.render("login")
});
router.post("/login",passport.authenticate("local",{
    successRedirect: "/campg",
    failureRedirect: "/"
}),function(req,res){
    
});
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","logged out :D")
    res.redirect("/");
});

module.exports=router;