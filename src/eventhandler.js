const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");
const infoLogger = require("./infoLogger");

function eventHandler() {
    let gameStateInstance;
    const htmlHandlerInstance = htmlHandler();
    htmlHandlerInstance.initGameField();
    const infoLoggerInstance = infoLogger();
    

    // Store references to the handler functions
    const attackHandlers = new WeakMap();
    const placeShipHandlers = new WeakMap();
    const starGameHandlers = new WeakMap();
    const resetGameHandlers = new WeakMap();

    setupHandlers();

    function setupHandlers() {
        const startBtn = document.getElementById("btnStartGame");

        // setup Handler for letter removal
        const startGameHandler = () => startGame();
        startBtn.addEventListener("click", startGameHandler);
        starGameHandlers.set(startBtn, startGameHandler);
    }

    function setupAttackHandlers() {
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);

        const playerAreas = document.querySelectorAll(".playerArea");
        const btnTurnShip = document.getElementById("turnShipDiv");
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

    function removeAttackHandlers() {
        const playerAreas = document.querySelectorAll(".playerArea");

        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                // First remove any existing attack handlers
                const attackHandler = attackHandlers.get(cell);
                if (attackHandler) {
                    cell.removeEventListener("click", attackHandler);
                    attackHandlers.delete(cell);
                }
            })
        }
    }

    function startGame() {
        gameStateInstance = gameState(botPlayer = true);
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);

        setupPlaceShipHandlers();
        setupResetGameHandler();
    }

    function setupResetGameHandler() {
        const startBtn = document.getElementById("btnStartGame");
        // remove existing startGame event listeners
        const startGameHandler = starGameHandlers.get(startBtn);
        startBtn.removeEventListener("click", startGameHandler);

        const resetGameHandler = () => resetGame();
        startBtn.addEventListener("click", resetGameHandler);
        resetGameHandlers.set(startBtn, resetGameHandler);       

        htmlHandlerInstance.updateButton("Restart");
    }

    function resetGame() {
        gameStateInstance = gameState(botPlayer = true);
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        htmlHandlerInstance.emptyGameField();
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        htmlHandlerInstance.removePlayerShips();
        htmlHandlerInstance.emptyGameAction();
        htmlHandlerInstance.emptyGameState();

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
        // Update action fields
        htmlHandlerInstance.emptyGameAction();
        htmlHandlerInstance.emptyGameState();

        // Handling gameEnd
        let gameOver = false
        // Method for fetching ID of field based on Class
        for (let classElement of e.currentTarget.classList) {
            if (classElement.includes("fieldPosition_")) {
                fieldID = classElement.slice(14);
                gameOver = gameStateInstance.attackMove(fieldID);
            }
        }
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        if (gameOver) {
            removeAttackHandlers();
        } else {
            htmlHandlerInstance.updateEntireField(gameStateInstance.getActivePlayerId(), gameStateInstance.getActivePlayer(), gameStateInstance.getInactivePlayer());
            infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
            htmlHandlerInstance.displayPlayerShips(gameStateInstance.getActivePlayer(), gameStateInstance.getActivePlayerId());
        }

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

        if (!nextShip) {
            gameStateInstance.switchTurn();
            infoLoggerInstance.updateGameAction(gameStateInstance.getActivePlayer().gameBoard.nextShipToPlace())
            htmlHandlerInstance.emptyGameState();
        }  
        // CHECK HERE I PLACE SHIP IS FINISHED
        if (gameStateInstance.checkPlaceShipsState()) {
            setupAttackHandlers();
            htmlHandlerInstance.emptyGameAction();
        } 
        htmlHandlerInstance.updateEntireField(gameStateInstance.getActivePlayerId(), gameStateInstance.getActivePlayer(), gameStateInstance.getInactivePlayer());
        infoLoggerInstance.updateState(gameStateInstance.getGameState());
        infoLoggerInstance.updateActivePlayer(gameStateInstance.getActivePlayer().name);
        htmlHandlerInstance.displayPlayerShips(gameStateInstance.getActivePlayer(), gameStateInstance.getActivePlayerId());
    }
    
}

module.exports = eventHandler;