const Player = require("./player");

function gameState() {
    const GAMESTATES = {
        0: "Setup Players",
        1: "Place Ships",
        2: "Attack opponent!",
        3: "Winner determined"
    }
    let activeState = 0;

    const player1 = new Player("Player1");
    const player2 = new Player("Player2");

    activeState = 1;

    let activePlayer = player1;
    

    function switchTurn() {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    function getActivePlayer() {
        return activePlayer
    }

    function autoPlaceShips() {
        if (activeState === 1) {
            const SIZESHIPS = [2,3,3,4,5];
            const player1GameBoard = player1.gameBoard;
    
    
            for (let i = 0; i < 6; i++) {
                player1GameBoard.placeShip(SIZESHIPS[i], [i,3], true);
            }
            const player2GameBoard = player2.gameBoard;
    
            for (let i = 0; i < 6; i++) {
                player2GameBoard.placeShip(SIZESHIPS[i], [i,3], true);
            }
    
            activeState = 2;
        } else {
            throw new Error("Currently in the Wrong game State!");   
        }
    }

    function getGameState() {
        return GAMESTATES[activeState];
    }

    return {
        getActivePlayer,
        switchTurn,
        getGameState,
        autoPlaceShips
    }
}

module.exports = gameState;