const User = require("../models/user.js");

module.exports.signup = async(req,res) =>{
    try{
        let{username,email,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser,(err) =>{
        if(err){
           return next(err);
        }
        req.flash("success","Welcome To Wanderlust");
        res.redirect("/listings");
    })
    
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) =>{
        req.flash("success","Welcome Back To Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings" // i.e if we directly login then 
        // through the main page then originalurl will be empty hence we applied or condition
        res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) =>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
};