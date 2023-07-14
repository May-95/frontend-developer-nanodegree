const dotenv = require("dotenv");
dotenv.config();

// API's base and key
const base = "https://api.meaningcloud.com/sentiment-2.1?";
const key = `key=${process.env.API_KEY}`;

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
app.use(express.static("dist"));

// port number
const port = 8081;

// spin up the server
const server = app.listen(port, listening);

function listening() {
  console.log(`Server is running on localhost at port ${port}.`);
}

// get requests
app.get("/", function (req, res) {
  res.send("dist/index.html");
});

// post requests
app.post("/analyse", async function (req, res) {
  const url = `&${req.body.type}=${req.body.input}`;
  const apiRes = await fetch(base + key + url);
  const data = {
    data: await apiRes.json(),
    type: req.body.type,
    input: req.body.input,
  };
  const finalData = addData(data);
  res.send(finalData);
});

// saves the necessary info from API data for the UI to use
function addData(req, res) {
  const result = {
    status: req.data.status.msg,
    type: req.type,
    input: req.input,
    agreement: req.data.agreement,
    confidence: req.data.confidence,
    irony: req.data.irony,
    polarity: req.data.score_tag,
    subjectivity: req.data.subjectivity,
  };
  return result;
}
