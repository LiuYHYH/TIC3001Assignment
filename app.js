const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // parse JSON data

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // create an in-memory database connection

//Create table players
db.serialize(() => {
  db.run("CREATE TABLE players (id INT PRIMARY KEY, name TEXT, team TEXT)");
});

// Insert data into the table
db.serialize(() => {
  db.run("INSERT INTO players (id, name, team) VALUES (?, ?, ?)", [1, "Lebron James", "Lakers"]);
  db.run("INSERT INTO players (id, name, team) VALUES (?, ?, ?)", [2, "Luka Doncic", "Mavericks"]);
  db.run("INSERT INTO players (id, name, team) VALUES (?, ?, ?)", [3, "Michael Jordan", "Bulls"]);
});

app.get('/players', (req, res) => {
  db.all('SELECT * FROM players', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading from database');
    } else {
      res.json(rows);
    }
  });
});

app.post('/addplayers', (req, res) => {
  const newPlayer = {
    id: req.body.id,
    name: req.body.name,
    team: req.body.team
  };
  if(newPlayer.id<=0){
    return res.status(400).send('player ID must be positive integer');
  }
  db.run('INSERT INTO players(id, name, team) VALUES (?, ?, ?)', [newPlayer.id, newPlayer.name, newPlayer.team], function(err) {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
    res.redirect('/players');
  });
});

    
app.put('/players/:id', (req, res) => {
  const id = req.params.id;
  const updatedPlayer = req.body;
  db.run('UPDATE players SET name = ?, team = ? WHERE id = ?',
    [updatedPlayer.name, updatedPlayer.team, id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating database');
      } else if (this.changes === 0) {
        res.status(404).send('Player not found');
      } else {
        res.json(updatedPlayer);
      }
    });
});

app.delete('/players/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM players WHERE id = ?', id, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting from database');
    } else if (this.changes === 0) {
      res.status(404).send('Player not found');
    } else {
      res.json({ message: `Player with id ${id} deleted.` });
    }
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})