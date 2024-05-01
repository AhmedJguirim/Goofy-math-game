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
            record INT,
            maxCombo INT,
            gold INT
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
    db.run(
      `
      CREATE TABLE IF NOT EXISTS gold_piles (
        id INTEGER PRIMARY KEY,
        amount INT,
        player_id INT,
        FOREIGN KEY(player_id) REFERENCES players(id)
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating 'gold_piles' table:", err.message);
        } else {
          console.log("Table 'gold_piles' created successfully");
        }
      }
    );
  });

  db.close();
};

module.exports = createSchemas;
