const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");

function eventHandler() {
    let gameStateInstance;
    const htmlHandlerInstance = htmlHandler();
    htmlHandlerInstance.initGameField("player1");
    htmlHandlerInstance.initGameField("player2");
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