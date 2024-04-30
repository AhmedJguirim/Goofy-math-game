const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("myDb2.db");

const createSchemas = () => {
  db.serialize(() => {
    db.run(
      `
        CREATE TABLE IF NOT EXISTS players (
          id INTEGER PRIMARY KEY,
          name TEXT UNIQUE,
            password TEXT,
            record INT
    
        )
      `,
      (err) => {
        if (err) {
          console.error("Error creating 'players' table:", err.message);
        } else {
          console.log("Table 'players' created successfully");
        }
      }
    );
  });

  db.close();
};

module.exports = createSchemas;
