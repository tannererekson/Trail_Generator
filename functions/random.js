// functions/random.js

const sqlite3 = require('sqlite3');

exports.handler = async (event, context) => {
  const db = new sqlite3.Database('trails.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the trails database.');
    }
  });

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM trails ORDER BY RANDOM() LIMIT 1', (err, row) => {
      if (err) {
        db.close();
        reject({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
        return;
      }
      db.close();
      resolve({ statusCode: 200, body: JSON.stringify(row) });
    });
  });
};
