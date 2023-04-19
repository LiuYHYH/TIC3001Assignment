import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ id: "", name: "", team: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPlayer((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGetPlayers = () => {
    axios.get("http://localhost:3000/players").then((response) => {
      setPlayers(response.data);
    });
  };

  const handleAddPlayer = () => {
    axios
      .post("http://localhost:3000/addplayers", newPlayer)
      .then((response) => {
        setNewPlayer({ id: "", name: "", team: "" });
        handleGetPlayers();
      });
  };

  const handleUpdatePlayer = (id) => {
    const updatedPlayer = players.find((player) => player.id === id);
    axios
      .put(`http://localhost:3000/players/${id}`, updatedPlayer)
      .then((response) => {
        handleGetPlayers();
      });
  };

  const handleDeletePlayer = (id) => {
    axios.delete(`http://localhost:3000/players/${id}`).then((response) => {
      handleGetPlayers();
    });
  };

  useEffect(() => {
    handleGetPlayers();
  }, []);

  return (
    <div>
      <h1>Player List</h1>
      <table>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team}</td>
              <td>
                <button onClick={() => handleUpdatePlayer(player.id)}>
                  Update
                </button>
                <button onClick={() => handleDeletePlayer(player.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Player</h2>
      <form>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={newPlayer.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newPlayer.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Team:
          <input
            type="text"
            name="team"
            value={newPlayer.team}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleAddPlayer}>
          Add
        </button>
      </form>
    </div>
  );
}

export default PlayerList;
