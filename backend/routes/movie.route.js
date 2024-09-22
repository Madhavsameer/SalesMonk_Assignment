const router = require("express").Router();

const { addEditMovie, getMovies, deleteMovie } = require("../controllers/movie.controller");

router.get("/", getMovies);

router.post("/add", addEditMovie);

router.delete("/delete/:id", deleteMovie);

module.exports = router;
