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

    // Store references to the handler functions
    const attackHandlers = new WeakMap();
    const placeShipHandlers = new WeakMap();

    function setupAttackHandlers() {
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);

        const playerAreas = document.querySelectorAll(".playerArea");
        const btnTurnShip = document.getElementById("btnTurnShip");
        btnTurnShip.classList.add("deactive");

        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                // First remove any existing placeShip event listeners
                const placeHandler = placeShipHandlers.get(cell);
                if (placeHandler) {
                    cell.removeEventListener("click", placeHandler);
                    placeShipHandlers.delete(cell);
                }
                
                // Create and store new attack handler
                const attackHandler = (e) => attackOpponent(e, playerArea.id);
                cell.addEventListener("click", attackHandler);
                attackHandlers.set(cell, attackHandler);
            })
        }
    }

    function setupPlaceShipHandlers() {
        const playerAreas = document.querySelectorAll(".playerArea");
        const btnTurnShip = document.getElementById("turnShipDiv");
        btnTurnShip.classList.remove("deactive");
        
        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                // First remove any existing attack handlers
                const attackHandler = attackHandlers.get(cell);
                if (attackHandler) {
                    cell.removeEventListener("click", attackHandler);
                    attackHandlers.delete(cell);
                }
                
                // Create and store new placeShip handler
                const placeHandler = (e) => placeShip(e, playerArea.id);
                cell.addEventListener("click", placeHandler);
                placeShipHandlers.set(cell, placeHandler);
            })
        }
        infoLoggerInstance.updateGameAction(gameStateInstance.getActivePlayer().gameBoard.nextShipToPlace());
    }

    function startGame() {
        gameStateInstance = gameState();
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);

        setupPlaceShipHandlers();
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
        if (playerID === gameStateInstance.getInactivePlayerId()) {
            infoLoggerInstance.updateGameState("Wrong Player!");
            return
        }
        // Fetching state of turnShipButton
        const turnShipBtn = document.getElementById("btnTurnShip");
        // Method for fetching ID of field based on Class
        let nextShip
        for (let classElement of e.currentTarget.classList) {
            if (classElement.includes("fieldPosition_")) {
                fieldID = classElement.slice(14);
                nextShip = gameStateInstance.placeShip(fieldID, turnShipBtn.checked);
            }
        }

        // CHECK HERE I PLACE SHIP IS FINISHED
        if (gameStateInstance.checkPlaceShipsState()) {
            gameStateInstance.activeState = 2;
            setupAttackHandlers();
        } 
        htmlHandlerInstance.updateEntireField(playerID, gameStateInstance.getActivePlayer(), gameStateInstance.getInactivePlayer());
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        htmlHandlerInstance.displayPlayerShips(gameStateInstance.getActivePlayer(), playerID);
        if (!nextShip) {
            gameStateInstance.switchTurn();
        }  
    }
    
}

module.exports = eventHandler;