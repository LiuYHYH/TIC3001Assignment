// import React from 'react';
import axios from 'axios';
import players from './player';
import './App.css';
import React, { useState } from 'react';

function App() {
  
  const handleGetPlayers = () => {
    axios.get('http://localhost:3000/players')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => { 
        console.log(error);
      });
  }

  // Create a new player
const [addPlayers] = useState([]);
const handleAddPlayer = async() => {
  const newPlayer = {
    id: 5,
    name: 'Kobe Bryant',
    team: 'Lakers'
  };
  

  axios.post('http://localhost:3000/addplayers', newPlayer)
    .then(response => {
      console.log(response.data);
      addPlayers(players => {
        players.push(newPlayer);
        return players;
      })
    })
    
    .catch(error => {
      console.log(error);
    });
  }
// Update a player
const [setPlayers] = useState([]);
const handleUpdatePlayer = () => {
  const updatedPlayer = {
    name: 'James Harden',
    team: '76ers'
  };
  axios.put('http://localhost:3000/players/1', updatedPlayer)
    .then(response => {
      console.log(response.data);
      // update the players array in state with the updated player
      setPlayers(prevPlayers => {
        const playerIndex = prevPlayers.findIndex(player => player.id === 1);
        if (playerIndex !== -1) {
          const updatedPlayers = [...prevPlayers];
          updatedPlayers[playerIndex] = response.data;
          return updatedPlayers;
        } else {
          return prevPlayers;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
}


// Delete a player
const handleDeletePlayer = () => {
  axios.delete('http://localhost:3000/players/5')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}

return (
  <div className="App">
    <button onClick={handleGetPlayers}>Get All Players</button>
    <button onClick={handleAddPlayer}>Add Player</button>
    <button onClick={handleUpdatePlayer}>Update Player</button>
    <button onClick={handleDeletePlayer}>Delete Player</button>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        {players.map(player => (
          <tr key={player.id}>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.team}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
        }

export default App;
