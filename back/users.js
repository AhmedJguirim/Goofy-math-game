const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// SQLite database setup
const db = new sqlite3.Database("myDb2.db");

// Add a new player
router.post("/addPlayer", (req, res) => {
  const { name, password } = req.body;

  db.run(
    "INSERT INTO players (name, password, record) VALUES (?, ?, ?)",
    [name, password, 0],
    (err) => {
      if (err) {
        console.error("Error adding player:", err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Player added successfully");
      }
    }
  );
});

// Update a player
router.put("/updateRecord/:id", (req, res) => {
  const playerId = req.params.id;
  const { record } = req.body;
  console.log(record);

  db.run(
    "UPDATE players SET record = ? WHERE id = ?",
    [record, playerId],
    (err) => {
      if (err) {
        console.error("Error updating player:", err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Player updated successfully");
      }
    }
  );
});

// View a single player
router.post("/auth", (req, res) => {
  const { name, password } = req.body;
  db.get(
    "SELECT * FROM players WHERE name = ? and password = ?",
    [name, password],
    (err, row) => {
      if (err) {
        console.error("Error retrieving player:", err.message);
        res.status(500).send("Internal Server Error");
      } else if (!row) {
        res.status(404).send("Player not found");
      } else {
        res.status(200).json(row);
      }
    }
  );
});

// Export the router
module.exports = router;
