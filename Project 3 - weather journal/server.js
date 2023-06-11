// app's API endpoint
let projectData = {};

// start an instance of app
const express = require("express");

// express to run server
const app = express();

// dependencies
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// initialise the main project folder
app.use(express.static("website"));

// port number
const port = 8000;

// spin up the server
const server = app.listen(port, listening);

// callback for debugging
function listening() {
  console.log(`Server is running on localhost at port ${port}.`);
}

// responds to get requests, sends back projectData object
app.get("/", function (req, res) {
  res.send(projectData);
});

// returns projectData on /all
app.get("/all", function (req, res) {
  res.send(projectData);
});

// handles post requests
app.post("/add", addEntry);

// function that adds entry to projectData using the user's data and the data from OpenWeather API
function addEntry(req, res) {
  // stores the current date in a string format omitting the name of the day
  const date = new Date().toDateString().slice(3);
  // the data from the request is saved in project data with the location, icon, temp, description, date and response
  projectData = {
    location: req.body.data.name,
    icon: req.body.data.weather[0].icon,
    temp: req.body.data.main.temp,
    description: req.body.data.weather[0].description,
    date: date,
    response: req.body.feelings,
  };
  // the new saved projectData is sent
  res.send(projectData);
}
