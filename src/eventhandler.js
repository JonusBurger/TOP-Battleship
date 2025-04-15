const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");

function eventHandler() {
    let gameStateInstance;
    const htmlHandlerInstance = htmlHandler();
    htmlHandlerInstance.initGameField();
    setupHandlers();
    const playerAreas = document.querySelectorAll(".playerArea");
    for (let playerArea of playerAreas) {
        const gameField = playerArea.querySelector(".gameField");
        gameField.addEventListener("click", (e) => attackOpponent(e, playerArea.id))
    }
    

    function setupHandlers() {
        const startBtn = document.getElementById("btnStartGame");
        startBtn.addEventListener("click", () => {startGame()})
    }

    function startGame() {
        gameStateInstance = gameState();
        console.log(gameStateInstance.getActivePlayer());
        htmlHandlerInstance.updateActivePlayerBanner(gameStateInstance.getActivePlayer().name,
        gameStateInstance.getGameState())
        gameStateInstance.autoPlaceShips();
    }

    function attackOpponent(e, playerID) {
        if (!gameStateInstance.getGameState() === "Attack opponent!") {
            return
        }
        if (!e.currentTarget.classList.contains("gameCell")) {
            return
        }
        if (playerID === gameState.getActivePlayerId()) {
            return
        }
        // Method for fetching ID of field based on Class
        let fieldID;
        for (let classElement of e.currentTarget.classList) {
            if (classElement.contains("fieldPosition_")) {
                console.log(classElement)
                const fieldID = classElement.slice(13);
                console.log(fieldID)
            }
        }
    }
    
}

module.exports = eventHandler;