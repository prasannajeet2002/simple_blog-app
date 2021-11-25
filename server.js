const express = require("express");
const mongoose = require("mongoose");
const articlerouter = require("./routes/article");
const app = express();
const Article = require('./models/articlesdb')
const methodoverride = require('method-override');

const PORT = process.env.PORT || 4000;

mongoose 
  .connect("mongodb://localhost:27017/articles", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connection succesful");
  })
  .catch((error) => console.log(error));

// app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); 
app.use(methodoverride('_method'))


app.get("/",async (req, res) => {
  const article = await Article.find().sort({createdat:'desc'})
  res.render("articles/index", { article: article });
}); 

app.use('/articles', articlerouter);
app.listen(PORT);
