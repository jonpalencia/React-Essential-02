import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { INITIAL_GAMEBOARD, PLAYER_NAME } from './config/config';
import { deriveStatePlayer, deriveHasWinner } from './helpers/helpers';
import { WINNING_COMBINATIONS } from './config/winning_combination';

export default function App() {
  const [playerName, setPlayerName] = useState(PLAYER_NAME);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveStatePlayer(gameTurns);
  const gameBoard = [...INITIAL_GAMEBOARD.map(arr => [...arr])];

  gameTurns.forEach(turn => {
    const {square: {row, col}, player} = turn; // prettier-ignore
    gameBoard[row][col] = player;
  });

  const winner = deriveHasWinner(WINNING_COMBINATIONS, gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleRematch = function () {
    setGameTurns([]);
  };
  const handleNameChange = function (symbol, newName) {
    setPlayerName(prevName => {
      return { ...prevName, [symbol]: newName };
    });
  };

  const handleSelectSquare = function (rowIndex, colIndex) {
    setGameTurns(prevTurn => {
      const currPlayer = deriveStatePlayer(prevTurn);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currPlayer,
        },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  };

  return (
    <menu>
      <div id="game-container">
        <ol className="highlight-player" id="players">
          <Player
            onChangeName={handleNameChange}
            initialName={PLAYER_NAME.X}
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            onChangeName={handleNameChange}
            initialName={PLAYER_NAME.O}
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver result={winner} onRematch={handleRematch} />
        )}
        <GameBoard
          activePlayerSymbol={activePlayer}
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </menu>
  );
}
