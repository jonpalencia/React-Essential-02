import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // This will be a fn placeholder for the callback handler whenever a player clicked or choose a grid in gameboard.
  const handleSelectSquare = function (e) {
    console.log(e.target.dataset);
    const { row, col } = e.target.dataset;
    setGameBoard(prevBoard => {
      const updatedBoard = [...prevBoard];
      updatedBoard[row][col] = 'X';
      console.log(row, col);
      return updatedBoard;
    });
  };

  return (
    <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => (
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
