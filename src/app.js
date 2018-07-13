const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "./statics")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const accountRouter = require(path.join(__dirname, "./routers/accountRouter"));
app.use("/account", accountRouter);
app.listen(80, "127.0.0.1", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("start OK");
  }
});
