var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Require Article Schema
var Article = require("./models/article");

var app = express();
var PORT = process.env.PORT || 3000.

//--------------------------------------------------------
//MongoDB config
mongoose.connect("mongodb://localhost/NYTScrubber");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose ErrorLL ", err);
});

db.once("open", function(err) {
    console.log("Mongoose connection sucessfull");
});

// -------------------------------------------------------

//Main Route
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

//Get Route
app.get("/api", function(req, res) {
    Article.find({}).sort([
        ["date", "descending"]
    ]).exec(function(err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

//POST Route
app.post("/api", function(req, res) {
    console.log("Title: " + req.body.title);

    Article.create({
        title: req.body.title,
        date: Date.now(),
        url: req.body.link
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Article");
        }
    });
});

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
