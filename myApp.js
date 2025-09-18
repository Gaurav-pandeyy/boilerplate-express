const express = require('express');
const path = require('path');
const app = express();
const env = require("dotenv").config()

// Serve static files from "public" folder
app.use("/public",express.static(path.join(__dirname, "public")));

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