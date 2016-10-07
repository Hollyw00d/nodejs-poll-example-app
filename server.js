// Module that deals with routing and
// "require" loads an additional library
var express = require('express');

// Express handlebars module
var exphbs = require('express-handlebars');

// An instance of the express app
var app = express();

// Tell express to use handlebars as it's templating engine
// and look for a file called "views/layouts/base.handlebars" for
// the master layouts and then other files inside "views"
app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

// "polls" variable represents the model as there is no database yet
// and is an array of objects
var polls = [
  {
    id:     1,
    name:   "Will the Warriors win the NBA championship?",
    is_featured: true
  }, 
  {
    id:     2,
    name:   "Will Trump win the GOP nomination?",
    is_featured: false
  }
];

// Define a route inside express,
// "get" refers to an HTTP method,
// in the callback function 
// "req" refers to a request object and
// "res" refers to a response object
app.get('/', function(req, res) {
  // Below prints "Hello World!" on screen 
  // when I go to "/" relative path on website
  // res.send('Hello World!');    
  
  // Tells Express to look for a 
  // "home.handlebars" template inside "base" directory
  res.render('home', {
    //show_polls: polls 
    show_polls: polls
  });
});

function loadPollById(myChosenPoll) {
  for( var i = 0; i < polls.length; i++ ) {
    var pollIterator = polls[i];
    if( polls.id == myChosenPoll ) {
      return pollIterator;
    }
  }
  
}

// Route for each poll
// and ":poll_id" is a URL parameter where a value passed the to URL, 
// like "example.com/polls/1234" is passed in as the "req.params.poll_id" value
// below
app.get('/polls/:poll_id', function(req, res) {
  var myPollId = req.params.poll_id;
  
  var data = loadPollById(myPollId);
  
  var myPoll = {
    id: myPollId,
    name: 'sample poll'
  };
  
  res.render('viewPoll', data);
});

app.get('/tester', function(req, res) {
  // Below I'm passing in a JSON object (or hash table of keys and values, which is similar to an associative array) 
  // as a 2nd parameter to the "tester.handlebars" template
  res.render('tester', {
    first_name: "Donald",
    last_name: "Duck",
    now: new Date(),
    random_num: Math.round(Math.random() * 10)
  });
});


// Set up a static folder for files that don't change,
// like CSS and images and for example 
// if "hello.html" is inside this "public" directory then
// it this file will be viewable at "/static/hello.html"
app.use('/static', express.static('public'));

// For Cloud 9 I must use port 5000 (see below)
// and for other apps the port is usually 80
// Code below means listen to the default port number number 
// provided by the server (Cloud) or 5000, if none is provided,
// convert this into a number type, and assign it to a "port" variable
var port = Number(process.env.PORT || 5000);

// app listens to traffic on port 5000
app.listen(port);