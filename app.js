const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Load the trail data from the JSON file
const trailData = require('./trailData.json');

// Enable CORS for all routes
app.use(cors());

// Endpoint to get a random trail
app.get('/trails/random', (req, res) => {
  // Get a random index to select a trail from the array
  const randomIndex = Math.floor(Math.random() * trailData.length);
  
  // Retrieve the random trail
  const randomTrail = trailData[randomIndex];
  
  res.json(randomTrail);
});

// Endpoint to get all trails
app.get('/trails', (req, res) => {
  const { type, difficulty } = req.query;

  let filteredTrails = [...trailData];

  if (type) {
    filteredTrails = filteredTrails.filter(trail => trail.Type === type);
  }

  if (difficulty) {
    filteredTrails = filteredTrails.filter(trail => trail.Difficulty === difficulty);
  }

  res.json(filteredTrails);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
