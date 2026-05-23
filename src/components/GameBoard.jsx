import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialGameBoard;

  turns.forEach(turn => {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  });

  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // This will be a fn placeholder for the callback handler whenever a player clicked or choose a grid in gameboard.
  // const handleSelectSquare = function (e) {
  //   const { row, col } = e.target.dataset;
  //   if (gameBoard[row][col]) return; // This will prevent to click the already selected square which previously selected by a player.
  //   setGameBoard(prevGameBoard => {
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map(innerArr => [...innerArr]),
  //     ];
  //     updatedGameBoard[row][col] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });
  //   selectHandler();
  // };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  data-row={rowIndex}
                  data-col={colIndex}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
