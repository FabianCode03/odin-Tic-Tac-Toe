const GameBoard = (function () {
  let running = true
  let boardPositions = [null, null, null, null, null, null, null, null, null]
  const winningCombinations = [
    [0, 1, 2], // erste Zeile
    [3, 4, 5], // zweite Zeile
    [6, 7, 8], // dritte Zeile
    [0, 3, 6], // erste Spalte
    [1, 4, 7], // zweite Spalte
    [2, 5, 8], // dritte Spalte
    [0, 4, 8], // Diagonale von links oben nach rechts unten
    [2, 4, 6], // Diagonale von rechts oben nach links unten
  ]

  const getBoardPositions = () => boardPositions

  const positionIsEmpty = position => {
    if (boardPositions[position] !== null) {
      console.log("position schon belegt")

      return false
    }
    return true
  }

  const gameIsRunning = () => running

  const placeMoveOnBoard = (player, position) => {
    if (gameIsRunning() && positionIsEmpty(position)) {
      boardPositions[position] = player.getPlayerID()
      return 0
    }
    return 1
  }

  const boardIsFull = () => boardPositions.every(position => position !== null)

  const threeInARow = playerID =>
    winningCombinations.some(combination =>
      combination.every(index => boardPositions[index] === playerID)
    )

  const checkGameState = (playerID1, playerID2) => {
    if (threeInARow(playerID1)) {
      console.log(`Gewonnen: ${playerID1}`)
      running = false
      return 1
    }
    if (threeInARow(playerID2)) {
      console.log(`Gewonnen: ${playerID2}`)
      running = false
      return 2
    }
    if (boardIsFull()) {
      console.log("Unentschieden")
      running = false
      return -1
    }
    console.log("Spiel geht weiter")
    return 0
  }

  const logBoard = () => console.table(boardPositions)

  const printBoard = () => {
    let tempBoard = []
    for (let i = 0; i < boardPositions.length; i += 3) {
      tempBoard.push(boardPositions.slice(i, i + 3))
    }
    console.table(tempBoard)
  }

  return {
    getBoardPositions,
    placeMoveOnBoard,
    checkGameState,
    logBoard,
    printBoard,
  }
})()

const createPlayer = function (playerID) {
  const id = playerID
  const getPlayerID = () => id
  return { getPlayerID }
}

const Game = (function () {
  const player1 = createPlayer("X")
  const player2 = createPlayer("O")
  let currentPlayer = Math.random() < 0.5 ? player1 : player2

  const playMove = e => {
    const playerChoice = e.target.id

    GameBoard.placeMoveOnBoard(currentPlayer, playerChoice)

    const state = GameBoard.checkGameState(
      player1.getPlayerID(),
      player2.getPlayerID()
    )

    switch (state) {
      case 0:
        GameBoard.printBoard()
        DisplayController.render()
        currentPlayer = currentPlayer == player1 ? player2 : player1
        break

      case 1:
        DisplayController.render()
        //handle player 1 won
        break

      case 2:
        DisplayController.render()
        //handle player 2 won
        break

      case -1:
        DisplayController.render()
        //handle draw
        break

      default:
        break
    }
  }
  return { playMove }
})()

const DisplayController = (function () {
  const gameCells = Array.from(document.querySelectorAll(".game-cell"))
  const positions = GameBoard.getBoardPositions()

  gameCells.forEach(cell =>
    cell.addEventListener("click", e => Game.playMove(e))
  )

  console.log(positions)
  console.log(gameCells)

  const render = () => {
    gameCells.forEach((cell, index) => {
      cell.textContent = positions[index]
    })
  }
  return { render }
})()
