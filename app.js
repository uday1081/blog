const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb://uday18:Uday123456@nodetuts-shard-00-00.zplvh.mongodb.net:27017,nodetuts-shard-00-01.zplvh.mongodb.net:27017,nodetuts-shard-00-02.zplvh.mongodb.net:27017/?ssl=true&replicaSet=atlas-10f4li-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
