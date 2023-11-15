const GameBoard = (function () {
  let boardPositions = [null, null, null, null, null, null, null, null, null];
  const placeMoveOnBoard = (player, position) =>
    (boardPositions[position] = player == 1 ? "X" : "O");
  const logBoard = () => console.log(boardPositions);
  return { placeMoveOnBoard, logBoard };
})();

const createPlayer = function (playerID) {
  const id = playerID;
  const getPlayerID = () => id;
  return { getPlayerID };
};

GameBoard.logBoard();
GameBoard.placeMoveOnBoard(2, 2);
GameBoard.logBoard();

const player1 = createPlayer(1);
console.log(player1.getPlayerID());
