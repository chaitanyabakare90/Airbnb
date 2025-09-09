const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validatereview, isLogged, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controller/reviews.js");
//Review 
//Review Post Route
router.post("/",isLogged,validatereview,wrapAsync(reviewController.newReview));

//Review Delete Route
router.delete("/:reviewId",isLogged,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;