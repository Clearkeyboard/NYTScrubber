var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Require Article Schema
var Article = require("./models/article.js");

var app = express();
var PORT = process.env.PORT || 3000.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('./public'));
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
    res.sendFile("./public/index.html");
});

//Get Route
app.get("/api", function(req, res) {
    Article.find({}).exec(function(err, doc) {
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
    console.log(req.body);

    Article.create({
        title: req.body.title,
        date: Date.now(),
        url: req.body.url
    }, function(err) {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Saved Article");
        }
    });
});

//Delete Route
app.delete('/api:id', function(req, res){
    Article.find({'_id': req.params.id}).remove().exec(function(err, doc) {res.send(doc);})
})
//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
