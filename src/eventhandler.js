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
        htmlHandlerInstance.updateActivePlayerBanner(gameStateInstance.getActivePlayer().name,
        gameStateInstance.getGameState())
        gameStateInstance.autoPlaceShips();

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