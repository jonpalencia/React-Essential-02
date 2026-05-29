import { useState } from 'react';

export default function Player(props) {
  const { onChangeName, initialName, symbol, isActive } = props;
  const [playerName, setPlayerName] = useState(initialName); // player's Name state which sets the name of each player
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = function () {
    setIsEditing(prevState => !prevState);
    if (isEditing) onChangeName(symbol, playerName);
  };
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
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
