const Listing = require("../models/listing.js");

module.exports.index = async (req,res) =>{
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs",{alllistings});
};

module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.showNewListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }else{
        console.log(listing);
        res.render("listings/show.ejs",{listing});
    }
    
};

module.exports.createNewPost = async (req,res) =>{
    // if(!req.body.listings){
    //     throw new ExpressError(400,"Send Valid data for list");
    // }
    // const result = listingSchema.validate(req.body);
    // if(result.error){
    //     throw new ExpressError(400,result.error);
    // }
    const newData = req.body.listings; // now here the data will already in Object Format becaz in new.ejs we have give name in key value pair
    const newInsert =  new Listing(newData); 
    // console.log(newInsert);
    newInsert.owner = req.user._id; 
    await newInsert.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
};

module.exports.editPost = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs",{listing});
    }
    
};

module.exports.updateListing = async(req,res) =>{
    // if(!req.body.listings){
    //     throw new ExpressError(400,"Send Valid data for list");
    // }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listings });
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;
    let a = await Listing.findByIdAndDelete(id);
    // console.log(a);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};