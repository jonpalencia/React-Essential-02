export const deriveStatePlayer = function (prevTurn) {
  let updatedPlayer = 'X';
  if (prevTurn.length > 0 && prevTurn[0].player === 'X') updatedPlayer = 'O';
  return updatedPlayer;
};

export const deriveHasWinner = function (
  WINNING_COMBINATIONS,
  gameBoard,
  playerName,
) {
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
  return winner;
};
