const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
app.use(express.static(path.join(__dirname, "./statics")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6660000 }
  })
);
const accountRouter = require(path.join(__dirname, "./routers/accountRouter"));
const studentManagerRouter = require(path.join(
  __dirname,
  "./routers/studentManagerRouter"
));
app.use("/account", accountRouter);
app.use("/studentManager", studentManagerRouter);
app.listen(80, "127.0.0.1", err => {
  if (err) {
    console.log(err);
  } else {
    console.log("start OK");
  }
});
