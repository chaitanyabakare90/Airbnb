const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLogged, isOwner, validatelisting} = require("../middleware.js");

const listingController = require("../controller/listing.js");

// Index Route  && Create Route 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogged,validatelisting,wrapAsync(listingController.createNewPost));//router.route()

//All listing Routes:- 

//New post Route
router.get("/new",isLogged,listingController.renderNewForm);


//Update Route && Delete route && Show Route:
router
    .route("/:id")
    .get(wrapAsync(listingController.showNewListing))
    .put(isLogged,isOwner,validatelisting,wrapAsync(listingController.updateListing))
    .delete(isLogged,isOwner,wrapAsync(listingController.deleteListing));


//Edit Route 
router.get("/:id/edit",isLogged,isOwner,wrapAsync(listingController.editPost));

module.exports = router;