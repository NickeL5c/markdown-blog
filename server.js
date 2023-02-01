const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Article = require("./models/article");
const app = express();
const articleRouter = require("./routes/articles");

mongoose.set("strictQuery", true); // deprecation warning override
mongoose.connect("mongodb://127.0.0.1/mdbBlog");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); // allows us to access all of the parameters from our article form from inside our article route by accessing like this: request.body.title
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
