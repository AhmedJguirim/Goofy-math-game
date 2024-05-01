const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// SQLite database setup
const db = new sqlite3.Database("myDb2.db");

// Add a new player
router.post("/addPlayer", (req, res) => {
  const { name, password } = req.body;

  db.run(
    "INSERT INTO players (name, password, record,maxCombo) VALUES (?, ?, ?, ?)",
    [name, password, 0, 0],
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

  db.run(
    "UPDATE players SET record = ? WHERE id = ?",
    [req.body.record, playerId],
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

// Update a player
router.put("/updateCombo/:id", (req, res) => {
  const playerId = req.params.id;
  const riches = (Math.floor(Math.random() * 10) + 1) * req.body.combo;

  db.run(
    "UPDATE players SET maxCombo = ? WHERE id = ?",
    [req.body.combo, playerId],
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

// Add gold in ironman mode
router.post("/addGoldIronMan", (req, res) => {
  const playerId = req.body.id;
  const riches = (Math.floor(Math.random() * 10) + 1) * req.body.amount;
  db.run(
    "INSERT INTO gold_piles (amount,player_id) VALUES (?, ?)",
    [riches, playerId],
    (err) => {
      if (err) {
        console.error("Error adding gold:", err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Gold added successfully");
      }
    }
  );
});

router.post("/addGold/:id", (req, res) => {
  const playerId = req.params.id;
  db.run(
    "INSERT INTO gold_piles (amount,player_id) VALUES (?, ?)",
    [req.body.amount, playerId],
    (err) => {
      if (err) {
        console.error("Error adding gold:", err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).send("Gold added successfully");
      }
    }
  );
});

// View a single player
router.post("/auth", (req, res) => {
  const { name, password } = req.body;
  db.get(
    `SELECT p.*, (
      SELECT SUM(gp.amount) 
      FROM gold_piles gp 
      WHERE gp.player_id = p.id
    ) AS gold
    FROM players p 
    WHERE p.name =? AND p.password =?`,
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

router.post("/auth", (req, res) => {
  const { name, password } = req.body;
  db.get(
    `SELECT p.*, (
      SELECT SUM(gp.amount) 
      FROM gold_piles gp 
      WHERE gp.player_id = p.id
    ) AS gold
    FROM players p 
    WHERE p.name =? AND p.password =?`,
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
router.get("/goldPiles/:playerId", (req, res) => {
  const playerId = req.params.playerId;
  db.all(
    "SELECT * FROM gold_piles WHERE player_id =?",
    playerId,
    (err, rows) => {
      if (err) {
        console.error("Error retrieving gold piles:", err.message);
        res.status(500).send("Internal Server Error");
      } else {
        res.status(200).json(rows);
      }
    }
  );
});
// Export the router
module.exports = router;
