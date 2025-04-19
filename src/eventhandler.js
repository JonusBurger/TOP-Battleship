const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");

function eventHandler() {
    let gameStateInstance;
    const htmlHandlerInstance = htmlHandler();
    htmlHandlerInstance.initGameField();
    setupHandlers();

    

    function setupHandlers() {
        const startBtn = document.getElementById("btnStartGame");
        startBtn.addEventListener("click", () => {startGame()})
    }

    function setupAttackHandlers() {
        const playerAreas = document.querySelectorAll(".playerArea");

        for (let playerArea of playerAreas) {
            const gameCells = playerArea.querySelectorAll(".gameCell");
            gameCells.forEach((cell) => {
                cell.addEventListener("click", (e) => attackOpponent(e, playerArea.id))
            })
        }
    }

    function startGame() {
        gameStateInstance = gameState();
        console.log(gameStateInstance.getActivePlayer());
        console.log(gameStateInstance.getActivePlayer().getGameBoard());
        htmlHandlerInstance.updateActivePlayerBanner(gameStateInstance.getActivePlayer().name,
        gameStateInstance.getGameState())
        
        gameStateInstance.autoPlaceShips();
        console.log(gameStateInstance.getActivePlayer().getGameBoard());

        setupAttackHandlers();
    }

    function attackOpponent(e, playerID) {
        if (!gameStateInstance.getGameState() === "Attack opponent!") {
            console.log("Wrong Game State!")
            return
        }
        if (!e.currentTarget.classList.contains("gameCell")) {
            return
        }
        if (playerID === gameStateInstance.getActivePlayerId()) {
            console.log("Wrong Player!")
            return
        }
        const playerHit = gameStateInstance.getInactivePlayer();
        let fieldID;
        let validMove;
        // Method for fetching ID of field based on Class
        for (let classElement of e.currentTarget.classList) {
            if (classElement.includes("fieldPosition_")) {
                const fieldID = classElement.slice(14);
                validMove = playerHit.gameBoard.receiveAttack(fieldID);
            }
        }
        htmlHandlerInstance.updateEntireField(playerID, playerHit);
        if (validMove) {
            gameStateInstance.switchTurn();
            htmlHandlerInstance.updateActivePlayerBanner(gameStateInstance.getActivePlayer().name,
            gameStateInstance.getGameState())    
        }
    
    }
    
}

module.exports = eventHandler;