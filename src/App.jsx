import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  const [activePlayer, setactivePlayer] = useState('X');
  const onSelectSquare = function () {
    setactivePlayer(prevSelect => (prevSelect === 'X' ? 'O' : 'X'));
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
          selectHandler={onSelectSquare}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </menu>
  );
}

export default App;
