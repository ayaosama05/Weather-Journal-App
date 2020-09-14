// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Setup Server
//const http = require("http");
//const hostname = "localhost";
const port = 8000;
const server = app.listen(port,listening)


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.options("*", cors());
// Initialize the main project folder
app.use(express.static('website'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//create a server object:
//const server = http.createServer(function (req, res) {
//  res.end(); //end the response
//}).listen(port , listening); //the server object listens on port 8080
//const server = http.createServer((req, res) => {
//   res.end('Hello from server.js');
//});
//server.listen(port, hostname, listening);
//const server = app.listen(port, listening);

function listening(){
   console.log(`Server running at port :${port}`);
}
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.get('/all', GetData);
function GetData(req,res){
  res.send(projectData);
  console.log(projectData);
}

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
 app.post('/addUserComment',showAllInfo);

 function showAllInfo(req,res){
   
   projectData.city = req.body.City ;
   projectData.temp = req.body.temp ;
   projectData.feeling = req.body.feeling ;
   
   res.send(projectData);
   console.log(projectData);
 }



//The POST route should anticipate receiving
//three pieces of data from the request body => temperature , date , user response
//POST route is setup to add each of these values with a key to projectData.


//Acquire API credentials from OpenWeatherMap website
//Use your credentials and the base url to create global variables at the top of your app.js code
//Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API.
//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
//Inside that callback function call your async GET request with the parameters:
//base url
//user entered zip code (see input in html with id zip)
//personal API key

