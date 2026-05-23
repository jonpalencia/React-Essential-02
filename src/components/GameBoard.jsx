import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ selectHandler, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // This will be a fn placeholder for the callback handler whenever a player clicked or choose a grid in gameboard.
  const handleSelectSquare = function (e) {
    const { row, col } = e.target.dataset;
    setGameBoard(prevGameBoard => {
      const updatedGameBoard = [
        ...prevGameBoard.map(innerArr => [...innerArr]),
      ];
      updatedGameBoard[row][col] = activePlayerSymbol;
      return updatedGameBoard;
    });
    selectHandler();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={handleSelectSquare}
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
