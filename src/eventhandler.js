const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");
const infoLogger = require("./infoLogger");

function eventHandler() {
    let gameStateInstance;
    const htmlHandlerInstance = htmlHandler();
    htmlHandlerInstance.initGameField();
    const infoLoggerInstance = infoLogger();
    setupHandlers();

    

    function setupHandlers() {
        const startBtn = document.getElementById("btnStartGame");
        startBtn.addEventListener("click", () => {startGame()})
    }

    function setupAttackHandlers() {
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        setupAttackHandlers();

        const playerAreas = document.querySelectorAll(".playerArea");

        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                // cell.removeEventListener("click", place);
                cell.addEventListener("click", function attack(e) { attackOpponent(e, playerArea.id)})
            })
        }
    }

    function setupPlaceShipHandlers() {
        const playerAreas = document.querySelectorAll(".playerArea");
        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                cell.addEventListener("click", function place(e) {placeShip(e, playerArea.id)})
            })
        }
    }

    function startGame() {
        gameStateInstance = gameState();
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        
        gameStateInstance.autoPlaceShips();
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        setupAttackHandlers();
    }

    function attackOpponent(e, playerID) {
        if (!gameStateInstance.getGameState() === "Attack opponent!") {
            infoLoggerInstance.updateGameState("Wrong Game State!");
            return
        }
        if (!e.currentTarget.classList.contains("gameCell")) {
            return
        }
        if (playerID === gameStateInstance.getActivePlayerId()) {
            infoLoggerInstance.updateGameState("Wrong Player!");
            return
        }
        // Method for fetching ID of field based on Class
        for (let classElement of e.currentTarget.classList) {
            if (classElement.includes("fieldPosition_")) {
                fieldID = classElement.slice(14);
                gameStateInstance.attackMove(fieldID);
            }
        }
        htmlHandlerInstance.updateEntireField(playerID, gameStateInstance.getActivePlayer(), gameStateInstance.getInactivePlayer());
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        htmlHandlerInstance.displayPlayerShips(gameStateInstance.getActivePlayer(), playerID);
    }

    function placeShip(e, playerID) {
        if (!gameStateInstance.getGameState() === "Place Ships") {
            infoLoggerInstance.updateGameState("Wrong Game State!");
            return
        }
        if (!e.currentTarget.classList.contains("gameCell")) {
            return
        }
        if (playerID === gameStateInstance.getActivePlayerId()) {
            infoLoggerInstance.updateGameState("Wrong Player!");
            return
        }
        // Method for fetching ID of field based on Class
        let TurnSwitch
        for (let classElement of e.currentTarget.classList) {
            if (classElement.includes("fieldPosition_")) {
                fieldID = classElement.slice(14);
                TurnSwitch = gameStateInstance.placeShip(fieldID);
            }
        }

        // CHECK HERE I PLACE SHIP IS FINISHED
        if (gameStateInstance.checkPlayerShipsState()) {
            gameStateInstance.activeState = 2;
            setupAttackHandlers();
        } else {
            htmlHandlerInstance.updateEntireField(playerID, gameStateInstance.getActivePlayer(), gameStateInstance.getInactivePlayer());
            infoLoggerInstance.updateState(gameStateInstance.getGameState());
            infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
            htmlHandlerInstance.displayPlayerShips(gameStateInstance.getActivePlayer(), playerID);
        }
 
    }
    
}

module.exports = eventHandler;