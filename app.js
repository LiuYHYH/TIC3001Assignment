const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // parse JSON data
const player = require('./player');

// import './my-app'

let players = [
  { id: 1, name: 'Lebron James', team: 'Lakers' },
  { id: 2, name: 'Luka Doncic', team: 'Mavericks' },
  { id: 3, name: 'Michael Jordan', team: 'Bulls' },
  { id: 4, name: 'Jayson Tatum', team: 'Celtics' },
];

app.get('/players', (req, res) => {
  res.json(players);
});

app.post('/addplayers', (req, res) => {

  newPlayer = {
    id: req.body.id,
    name: req.body.name,
    team: req.body.team
  };
  if (newPlayer.id <= 0) {
    return res.status(400).send('player ID must be positive integer');
  }
  players.push(newPlayer);
  res.redirect('/players');
});

app.put('/players/:id', (req, res) => {
  const id = req.params.id;
  const playerIndex = players.findIndex(player => player.id === parseInt(id));
  if (playerIndex === -1) {
    return res.status(404).send('Player not found');
  }
  const updatedPlayer = {
    id: parseInt(id),
    name: req.body.name,
    team: req.body.team
  };
  players[playerIndex] = updatedPlayer;
  res.json(players[playerIndex]);
});

app.delete('/players/:id', (req, res) => {
  const id = req.params.id;
  const playerIndex = players.findIndex(player => player.id === parseInt(id));
  if (playerIndex === -1) {
    return res.status(404).send('Player not found');
  }
  players.splice(playerIndex, 1);
  res.json({ message: `Player with id ${id} deleted.` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
