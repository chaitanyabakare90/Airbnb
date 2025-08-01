const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

main().then(() =>{
    console.log("connection successful");
}).catch((err) => {
    console.log(err);
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
app.get("/",(req,res) =>{
    res.send("Hi its working!!");
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

// Index Route 
app.get("/listings",async (req,res) =>{
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs",{alllistings});
})

//Read Route 

app.get("/listings/:id",async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

// app.get("/testListing" , async (req,res) =>{
//     let samplelist = new Listing({
//         title : "Chaitanya's Villa",
//         description : "By the beach",
//         price : 5000,
//         location:"Goa",
//         country : "India",
//     })
//     await samplelist.save();
//     console.log(samplelist);
//     res.send("Connection was successful");
// })
app.listen(8080, ()=>{
    console.log("Server is Listening");
})