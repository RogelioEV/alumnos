// Dependencies requires
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var session = require("express-session");

//Require db conn
require("./bin/db/databaseConnection");

//Routing Files
var indexRouter = require("./routes/index");
var alumnosRouter = require("./routes/alumnos");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(
  session({
    key: "user_sid",
    secret: "DMyZkXJTjehCjeX07yHynTDRV62zaCou",
    resave: true,
    saveUninitialized: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  if (!req.session.user && req.user_sid) {
    res.clearCookie("user_sid");
  }
  next();
});

//Use routers
app.use("/", indexRouter);
app.use("/alumnos", alumnosRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

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

module.exports = app;
