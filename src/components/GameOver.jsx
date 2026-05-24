export default function GameOver({ result, onRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {result ? <p>{result} has won the game! </p> : <p>It's a draw!</p>}
      <p>
        <button onClick={onRematch}>Rematch</button>
      </p>
    </div>
  );
}
