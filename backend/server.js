const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.set("view engine", "ejs");

const moviesRouter = require("./routes/movie.route");
const reviewsRouter = require("./routes/review.route");

app.use("/movie", moviesRouter);
app.use("/reviews", reviewsRouter);

app.listen(port, async () => {
  try {
    console.log("Server is running on port:" + port);
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });
    console.log("MongoDB connection established");
  } catch (err) {
    console.log(err);
  }
});
