import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './winning_combination';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveStatePlayer = function (prevTurn) {
  let updatedPlayer = 'X';
  if (prevTurn.length > 0 && prevTurn[0].player === 'X') updatedPlayer = 'O';
  return updatedPlayer;
};

export default function App() {
  const [playerName, setPlayerName] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveStatePlayer(gameTurns);

  // More modern way of cloning or creating a deep copy of a nested array or object.
  let gameBoard = structuredClone(initialGameBoard); //[...initialGameBoard.map(row => [...row])];

  gameTurns.forEach(turn => {
    const {square: {row, col}, player} = turn; // prettier-ignore
    gameBoard[row][col] = player;
  });

  let winner;
  WINNING_COMBINATIONS.forEach(combination => {
    const firstSquareCombination = gameBoard[combination[0].row][combination[0].column] // prettier-ignore
    const secondSquareCombination = gameBoard[combination[1].row][combination[1].column] // prettier-ignore
    const thirdSquareCombination = gameBoard[combination[2].row][combination[2].column] // prettier-ignore

    if (
      firstSquareCombination &&
      firstSquareCombination === secondSquareCombination &&
      firstSquareCombination === thirdSquareCombination
    )
      winner = playerName[firstSquareCombination].toUpperCase();
  });
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
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            onChangeName={handleNameChange}
            initialName="Player 2"
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
