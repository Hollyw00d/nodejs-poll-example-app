// Module that deals with routing and
// "require" loads an additional library
var express = require('express');

// An instance of the express app
var app = express();

// Define a route inside express,
// "get" refers to an HTTP method,
// in the callback function 
// "req" refers to a request object and
// "res" refers to a response object
app.get("/", function(req, res) {
    // Below prints "Hello World!" on screen 
    // when I go to "/" relative path on website
    res.send("Hello World!");              
});


// Set up a static folder for files that don't change,
// like CSS and images and for example 
// if "hello.html" is inside this "public" directory then
// it this file will be viewable at "/static/hello.html"
app.use("/static", express.static("public"));

// For Cloud 9 I must use port 5000 (see below)
// and for other apps the port is usually 80
// Code below means listen to the default port number number 
// provided by the server (Cloud) or 5000, if none is provided,
// convert this into a number type, and assign it to a "port" variable
var port = Number(process.env.PORT || 5000);

// app listens to traffic on port 5000
app.listen(port);