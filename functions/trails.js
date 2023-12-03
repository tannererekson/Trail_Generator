// functions/trails.js

const sqlite3 = require('sqlite3');

exports.handler = async (event, context) => {
  const db = new sqlite3.Database('trails.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the trails database.');
    }
  });

  const { type, difficulty } = event.queryStringParameters;
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

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        db.close();
        reject({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
        return;
      }
      db.close();
      resolve({ statusCode: 200, body: JSON.stringify(rows) });
    });
  });
};
