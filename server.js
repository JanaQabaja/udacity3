// Create an empty object to store project data
let projectData = {};

// Import the Express framework to manage server and routes
const express = require('express');

// Instantiate an Express application
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and apply CORS to allow cross-origin requests
const cors = require('cors');
app.use(cors());

// Set the main directory for serving static files
app.use(express.static('website'));

// Endpoint to handle GET requests and return project data
app.get('/all', (req, res) => {
  res.send(projectData);
});

// Endpoint to handle POST requests and update project data
app.post('/add', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData = { temperature, date, userResponse };
  res.send(projectData);
});

// Start the server and listen on a specified port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
