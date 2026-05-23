import { useState } from 'react';

export default function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName); // player's Name state which sets the name of each player
  const [isEditing, setIsEditing] = useState(false);
  const handleClick = () => setIsEditing(prevState => !prevState);
  const handleChange = function (e) {
    setPlayerName(prevName => (prevName = e.target.value));
  };

  const editablePlayerName = isEditing ? (
    <input
      type="text"
      className="active"
      required
      value={playerName}
      onChange={handleChange}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
