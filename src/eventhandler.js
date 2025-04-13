const gameState = require("./gameState");
const htmlHandler = require("./htmlHandler");

function eventHandler() {

    let gameStateInstance;
    setupHandlers();

    function setupHandlers() {
        const startBtn = document.getElementById("btnStartGame");

        startBtn.addEventListener("click", () => startGame)
    }

    function startGame() {
        gameStateInstance = gameState();
        console.log(gameStateInstance.getActivePlayer())
    }

    
}

module.exports = eventHandler;