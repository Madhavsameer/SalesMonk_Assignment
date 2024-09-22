const router = require("express").Router();

const {addEditReview, getMovieReviews, searchMovieReviews, deleteReview} = require("../controllers/review.controller")

router.post("/add", addEditReview)

router.get("/search", searchMovieReviews);

router.get("/:id", getMovieReviews);

router.delete("/delete/:id", deleteReview);

module.exports = router;
