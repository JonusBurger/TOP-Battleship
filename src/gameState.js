const Player = require("./player");
const infoLogger = require("./infoLogger");
const BotUser = require("./botuser"); 

function gameState(botPlayer = false) {
    const GAMESTATES = {
        0: "Setup Players",
        1: "Place Ships",
        2: "Attack opponent!",
        3: "Winner determined"
    }

    let activeState = 0;

    let player1;
    let player2;
    player1 = new Player("player1");

    // needed for handling smart AI
    let lastMoves = [];
    if (botPlayer) {
        player2 = new BotUser("player2");
    } else {
        player2 = new Player("player2");
    }

    const Players = [player1, player2];

    activeState = 1;

    let activePlayer = player1;
    let placeCurser;

    const infoLoggerInstance = infoLogger();
    

    function switchTurn() {
        activePlayer = activePlayer === player1 ? player2 : player1;

        // Handle Information Flow for Ship Placement
        if (activePlayer.isBot()) {
            if (activeState === 1) {
                activePlayer.placeShips();
                switchTurn();
            }
            if (activeState === 2) {
                let botMove = activePlayer.getAttackMove(lastMoves);
                attackMove(botMove);
                const result = infoLoggerInstance.getGameState();
                if (result === "Hit a ship!") {
                    lastMoves.push(botMove);
                } else if (result === "Ship sunk!") {
                    lastMoves = [];
                }
            }
        }
        if (activeState === 1) {
            const ships = activePlayer.gameBoard.getShips();
            for (const [key, ship] of Object.entries(ships)) {
                if (!ship) {
                    infoLoggerInstance.updateGameState(`place Ship ${key} (size ${activePlayer.gameBoard.getLengthOfShip(key)})`);
                }
            }
        }
    }

    function getActivePlayer() {
        return activePlayer
    }

    function getInactivePlayer() {
        return Players[0] === activePlayer ? player2 : player1
    }

    function getActivePlayerId() {
        return activePlayer === player1 ? "player1" : "player2"
    }

    function getInactivePlayerId() {
        return activePlayer === player1 ? "player2" : "player1"
    }

    function getPlayerList() {
        return Players
    }

    function placeShip(position, horizontal) {
        const ship = activePlayer.gameBoard.nextShipToPlace();
        const validMove = activePlayer.gameBoard.placeShip(
            activePlayer.gameBoard.getLengthOfShip(ship),
            position,
            horizontal);
        const nextShip = activePlayer.gameBoard.nextShipToPlace();
        if (validMove) {
            infoLoggerInstance.updateGameAction(nextShip);
        }
        if (nextShip) {
            return activePlayer.gameBoard.getLengthOfShip(nextShip);
        }
        return false

    }

    function autoPlaceShips() {
        if (activeState === 1) {
            const SIZESHIPS = [2,3,3,4,5];
            const player1GameBoard = player1.gameBoard;
    
    
            for (let i = 0; i < SIZESHIPS.length; i++) {
                player1GameBoard.placeShip(SIZESHIPS[i], [3,i*2], true);
            }
            const player2GameBoard = player2.gameBoard;
    
            for (let i = 0; i < SIZESHIPS.length; i++) {
                player2GameBoard.placeShip(SIZESHIPS[i], [3,i*2], true);
            }
    
            activeState = 2;
        } else {
            throw new Error("Currently in the Wrong game State!");   
        }
    }

    function checkPlaceShipsState() {
        // return true only when each player has placed all of his ships
        for (let player of Players) {
            if (player.gameBoard.nextShipToPlace()) {
                return false
            }
        }

        // changes GameState if currently in placeShip
        if (activeState === 1) {
            activeState = 2;
        }
        return true
    }

    function getGameState() {
        return GAMESTATES[activeState];
    }

    function attackMove(position) {
        const playerHit = getInactivePlayer();
        const validMove = playerHit.gameBoard.receiveAttack(position);

        if (validMove) {
            if (playerHit.gameBoard.isOver()) {
                activeState = 3;
                return true
            }
            switchTurn();
        }

        return false
    }

    return {
        getActivePlayer,
        getInactivePlayer,
        getActivePlayerId,
        getInactivePlayerId,
        getPlayerList,
        switchTurn,
        getGameState,
        placeShip,
        autoPlaceShips,
        checkPlaceShipsState,
        attackMove
    }
}

module.exports = gameState;