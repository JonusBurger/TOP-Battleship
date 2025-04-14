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

    function startGame() {
        gameStateInstance = gameState();
        console.log(gameStateInstance.getActivePlayer());
        htmlHandlerInstance.updateActivePlayerBanner(gameStateInstance.getActivePlayer().name,
        gameStateInstance.getGameState())
    }

    
}

module.exports = eventHandler;