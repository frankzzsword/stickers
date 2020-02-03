const express = require("express");
const app = express();
const createError = require("http-errors");
const fileUpload = require("express-fileupload");

//Setup DB
const mongoose = require("mongoose");
const db_url =
  "mongodb+srv://varunmishra:test123456@cluster0-jmowd.mongodb.net/test?retryWrites=true&w=majority";
const mongoDB = process.env.mongoDB_URI || db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup for Pug
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());
app.use("/sticker/", require("./controllers/sticker"));
app.use("/", require("./controllers/festival"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, (req, res) => {
  console.log("Working");
});

module.exports = app;
