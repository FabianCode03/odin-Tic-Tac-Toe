const GameBoard = (function () {
  let boardPositions = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const placeMoveOnBoard = (player, row, column) =>
    (boardPositions[row][column] = player.getPlayerID());

  const logBoard = () => console.table(boardPositions);

  return { placeMoveOnBoard, logBoard };
})();

const createPlayer = function (playerID) {
  const id = playerID;
  const getPlayerID = () => id;
  return { getPlayerID };
};
