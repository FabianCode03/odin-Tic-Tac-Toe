const GameBoard = (function () {
  let boardPositions = [null, null, null, null, null, null, null, null, null];
  const placeMoveOnBoard = (player, position) =>
    (boardPositions[position] = player == 1 ? "X" : "O");
  const logBoard = () => console.log(boardPositions);
  return { placeMoveOnBoard, logBoard };
})();

GameBoard.logBoard();
GameBoard.placeMoveOnBoard(2, 2);
GameBoard.logBoard();
