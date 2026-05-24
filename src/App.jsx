import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
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

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveStatePlayer(gameTurns);

  let gameBoard = initialGameBoard;

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
      winner = firstSquareCombination;
  });

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
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        {winner && <p>Player {winner} has won the game! 🥳</p>}
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

export default App;
