var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', "ejs");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){
    res.render('home')
});

app.listen(port, () => console.log('App is listening on port ${port}!'));

module.exports = app;