const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors'); // Import cors
const app = express();
const port = 3000;

// Create a new SQLite database instance
const db = new sqlite3.Database('trails.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the trails database.');
  }
});

// Enable CORS for all routes
app.use(cors());

// Define your API endpoints here
app.get('/trails/random', (req, res) => {
  // Add logic here to retrieve a random trail from the database
  db.get('SELECT * FROM trails ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Endpoint to get all trails
app.get('/trails', (req, res) => {
    const { type, difficulty } = req.query;
  
    let query = 'SELECT * FROM trails';
    const params = [];
  
    if (type && difficulty) {
      query += ' WHERE type = ? AND difficulty = ?';
      params.push(type, difficulty);
    } else if (type) {
      query += ' WHERE type = ?';
      params.push(type);
    } else if (difficulty) {
      query += ' WHERE difficulty = ?';
      params.push(difficulty);
    }
  
    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
