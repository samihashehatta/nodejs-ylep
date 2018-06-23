var express=require("express");
var app=express();
var bodyParser=require("body-parser"),
Camp=require("./models/camp.js"),
Comment=require("./models/comment.js"),
seedDB=require("./seed.js"),
passport=require("passport"),
LocalSt=require("passport-local"),
User=require("./models/user"),
campgRouts = require("./routes/campg"),
commentsRoutes = require("./routes/comments"),
indexRoutes = require("./routes/index"),
methodOverride=require("method-override"),
flash=require("connect-flash"),
mongoose=require("mongoose");
var url =process.env.DATABASEURL ||"mongodb://localhost/yelpcamp";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

app.use(flash());
app.use(require("express-session")({
    secret:"samiha helwa gedan",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalSt(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.nwuser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});



app.use("/campg",campgRouts);
app.use(indexRoutes);
app.use("/campg/:id/comment",commentsRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("connected");
})