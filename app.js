const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

//Router
const productRoute = require('./routes/product.route');



app.get("/", (req, res) => {
  res.send("router is working! YaY!");
});

// posting to database
app.use("/api/v1/prodect", productRoute);
module.exports = app;
