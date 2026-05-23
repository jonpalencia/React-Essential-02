import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

const deriveStatePlayer = function (prevTurn) {
  let updatedPlayer = 'X';
  if (prevTurn.length > 0 && prevTurn[0].player === 'X') updatedPlayer = 'O';
  return updatedPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveStatePlayer(gameTurns);

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
        <GameBoard
          activePlayerSymbol={activePlayer}
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </menu>
  );
}

export default App;
