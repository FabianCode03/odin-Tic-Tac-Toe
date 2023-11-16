const GameBoard = (function () {
  let running = true;
  let boardPositions = [null, null, null, null, null, null, null, null, null];
  const winningCombinations = [
    [0, 1, 2], // erste Zeile
    [3, 4, 5], // zweite Zeile
    [6, 7, 8], // dritte Zeile
    [0, 3, 6], // erste Spalte
    [1, 4, 7], // zweite Spalte
    [2, 5, 8], // dritte Spalte
    [0, 4, 8], // Diagonale von links oben nach rechts unten
    [2, 4, 6], // Diagonale von rechts oben nach links unten
  ];
  const placeMoveOnBoard = (player, position) =>
    (boardPositions[position] = player.getPlayerID());

  const boardIsFull = () => boardPositions.every(position => position !== null);

  const threeInARow = playerID =>
    winningCombinations.some(combination =>
      combination.every(index => boardPositions[index] === playerID)
    );

  const checkGameState = (playerID1, playerID2) => {
    if (threeInARow(playerID1)) {
      console.log("Gewonnen: player1");
      return 1;
    }
    if (threeInARow(playerID2)) {
      console.log("Gewonnen: player2");
      return 2;
    }
    if (boardIsFull()) {
      console.log("Unentschieden");
      return -1;
    }
    console.log("Spiel geht weiter");
    return 0;
  };

  const logBoard = () => console.table(boardPositions);

  const printBoard = () => {
    let tempBoard = [];
    for (let i = 0; i < boardPositions.length; i += 3) {
      tempBoard.push(boardPositions.slice(i, i + 3));
    }
    console.table(tempBoard);
  };

  return { placeMoveOnBoard, checkGameState, logBoard, printBoard };
})();

const createPlayer = function (playerID) {
  const id = playerID;
  const getPlayerID = () => id;
  return { getPlayerID };
};

const Game = (function () {
  const player1 = createPlayer("X");
  const player2 = createPlayer("O");
  GameBoard.printBoard();
  GameBoard.placeMoveOnBoard(player2, 8);
  GameBoard.printBoard();
  GameBoard.checkGameState(player1.getPlayerID(), player2.getPlayerID());

  // while (GameBoard.checkGameState() == 0) {
  //   // player action logic here
  // }
  // finished game logic here
})();
