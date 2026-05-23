import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const onSelectSquare = function () {
    // setActivePlayer(prevSelect => (prevSelect === 'X' ? 'O' : 'X'));
  };

  const handleSelectSquare = function (rowIndex, colIndex) {
    setActivePlayer(currActive => (currActive === 'X' ? 'O' : 'X'));

    setGameTurns(prevTurn => {
      let currPlayer = 'X';
      if (prevTurn.length > 0 && prevTurn[0].player === 'X') currPlayer = 'O';

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
          // selectHandler={onSelectSquare}
          activePlayerSymbol={activePlayer}
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
    </menu>
  );
}

export default App;
