const express = require('express');
const { isIP } = require('net');
const path = require('path');
const app = express();
const env = require("dotenv").config()

// Serve static files from "public" folder
app.use("/public",express.static(path.join(__dirname, "public")));
app.use(function middleware(req,res,next){
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string)
    next();
})
app.use(function middlewares(req,res,next){
    var retun = req.time;
    console.log(retun)
    next();
})
app.get("/now",
  function addTime(req, res, next) {
    req.time = new Date().toString();  // add time to the request object
    next(); // pass control to the next function
  },
  function handler(req, res) {
    res.json({ time: req.time }); // respond with JSON
  }
);

app.route("/name").get( function(req, res) {
    const first = req.query.first;
    const last = req.query.last;
    res.json({name:`${first} ${last}`});
})
.post(function (res,req){
    const first = req.body.first;
    const last = req.body.last;
    res.json({name:`${first} ${last}`});
})




const absolute_path = path.join(__dirname, "views", "index.html");

app.get("/", function(req, res) {
    res.sendFile(absolute_path);
});

app.get("/json",function(req,res){
    let message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    res.json({ "message": message });
})


console.log("Hello World");

module.exports = app;