function htmlHandler() {
    const FIELDHEIGTH = 10;
    const FIELDLENGTH = 10;

    function initGameField() {
        const gameFieldElements = document.querySelectorAll(".gameField");
        for (let gameField of gameFieldElements){
            for (let i = 0; i < FIELDHEIGTH; i++) {
                const gameRow = document.createElement("div");
                gameRow.classList.add("gameRow");
                for (let j = 0; j < FIELDLENGTH; j++) {
                    const gameCell = document.createElement("div");
                    gameCell.classList.add("gameCell");
                    gameCell.classList.add(`fieldPosition_${i}${j}`);

                    gameRow.appendChild(gameCell);
                }
                gameField.appendChild(gameRow);
            }
        }
        return gameFieldElements
    }

    function updateGameField(playerID, position, marker) {
        const gameFrame = document.getElementById(playerID);
        const coordinates = `.fieldPosition_${position[0]}${position[1]}`;
        const gameCell = gameFrame.querySelector(coordinates);
        gameCell.innerHTML = marker;

        // Add / Remove Class based on marker-typ
        if (marker === 'x') {
            gameCell.classList.add("ship");
        }
    }

    function updateEntireField(playerID, player, enemyPlayer) {
        displayActivePlayerField(playerID, player);
        displayEnemyField(playerID, enemyPlayer);
    }

    function displayEnemyField(playerID, enemyPlayer) {
        const playerAreas = document.querySelectorAll(".playerArea");
        for (let playerArea of playerAreas) {
            if (playerArea.id != playerID) {
                const gameField = enemyPlayer.getGameBoard();
                for (let i = 0; i < FIELDHEIGTH; i++) {
                    for (let j = 0; j < FIELDLENGTH; j++) {
                        const gameCell = playerArea.querySelector(`.fieldPosition_${i}${j}`)
                        const fieldValue = gameField[i][j];
                        if (fieldValue === 1) {
                            gameCell.innerHTML = "X";
                            gameCell.classList.add("damage");
                        } else if (fieldValue === 2) {
                            gameCell.innerHTML = "X";
                        } else if (fieldValue >= 20) {
                            gameCell.classList.remove("ship");
                        }
                    }
                }
            }
        }
    }

    function displayActivePlayerField(playerID, player) {
        const playerArea = document.getElementById(playerID)
        const gameField = player.getGameBoard();
        for (let i = 0; i < FIELDHEIGTH; i++) {
            for (let j = 0; j < FIELDLENGTH; j++) {
                const gameCell = playerArea.querySelector(`.fieldPosition_${i}${j}`)
                const fieldValue = gameField[i][j];
                if (fieldValue === 1) {
                    gameCell.innerHTML = "X";
                    gameCell.classList.add("damage");
                } else if (fieldValue === 2) {
                    gameCell.innerHTML = "X";
                } else if (fieldValue >= 20) {
                    gameCell.classList.add("ship");
                }
            }
        }
    }

    function emptyGameField() {
        const playerAreas = document.querySelectorAll(".playerArea");
        for (let playerArea of playerAreas) {
            const allCells = document.querySelectorAll(".gameCell");
            for (const cell of allCells) {
                cell.innerHTML = "";
            
                if (cell.classList.contains("damage")) {
                    cell.classList.remove("damage");
                }
                if (cell.classList.contains("ship")) {
                    cell.classList.remove("ship");
                }
            }
        }

    }

    function updateActivePlayerBanner(player, state) {
        const bannerElement = document.getElementById("infoBanner");
        const stateInfoElemen = document.getElementById("stateInfo");
        const playerElements = document.querySelectorAll(".playerBanner")
        const activeElement = bannerElement.querySelector(`.${player}`);
        activeElement.innerHTML = player + " Turn!";
        stateInfoElemen.innerHTML = state;
        const deactiveElement = playerElements[0] === activeElement ? playerElements[1] : playerElements[0];
        deactiveElement.innerHTML = "";
    }

    function updateStateInfo(state) {
        const stateInfoElement = document.getElementById("stateInfo");
        stateInfoElement.innerHTML = state;
    }

    function updateActivePlayer(player) {
        const bannerElement = document.getElementById("infoBanner");
        const playerElements = document.querySelectorAll(".playerBanner")
        const activeElement = bannerElement.querySelector(`.${player}`);
        activeElement.innerHTML = player + " Turn!";

        const deactiveElement = playerElements[0] === activeElement ? playerElements[1] : playerElements[0];
        deactiveElement.innerHTML = "";
    }
    
    function displayPlayerShips(player, playerID) {
        const ships = player.gameBoard.getShips();
        const gameFrame = document.getElementById(playerID);
        const shipFrame = gameFrame.querySelector(".shipFrame");
        const shipTemplate = document.getElementById("shipTemplate");
        shipFrame.replaceChildren();
        for (const [key, ship] of Object.entries(ships)) {
            if (!ship) {
                continue
            }

            const shipRow = shipTemplate.cloneNode(true);
            shipRow.id = "";
            const shipName = shipRow.querySelector(".shipName");
            shipName.innerHTML = `<p>${key}</p>`;
            const shipHealth = shipRow.querySelector(".shipHealth");
            for (let i = 0; i < ship.length; i++) {
                const shipCell = document.createElement("div");
                shipCell.classList.add("activeCell");
                if (i < ship.getHits()) {
                    shipCell.classList.add("damage");
                }
                shipHealth.appendChild(shipCell);
            }
            shipRow.classList.add("activeShip");
            shipFrame.appendChild(shipRow);
        }
    }

    function removePlayerShips() {
        const playerAreas = document.querySelectorAll(".playerArea");
        for (let playerArea of playerAreas) {
            const shipFrame = playerArea.querySelector(".shipFrame");
            shipFrame.replaceChildren();
        }
    }

    function displayGameAction(gameActionInfo) {
        const gameAction = document.getElementById("gameAction");
        gameAction.innerHTML = gameActionInfo;
    }

    function emptyGameAction() {
        const gameAction = document.getElementById("gameAction");
        gameAction.innerHTML = "";        
    }

    function displayGameState(gameStateInfo) {
        const gameState = document.getElementById("gameState");
        gameState.innerHTML = gameStateInfo;
    }
    function emptyGameState() {
        const gameState = document.getElementById("gameState");
        gameState.innerHTML = "";      
    }

    function updateButton(value) {
        const startBtn = document.getElementById("btnStartGame");
        startBtn.innerHTML = value;
    }

    return {
        initGameField,
        updateGameField,
        updateEntireField,
        updateActivePlayer,
        emptyGameField,
        updateStateInfo,
        updateActivePlayerBanner,
        displayPlayerShips,
        removePlayerShips,
        displayGameState,
        emptyGameState,
        displayGameAction,
        emptyGameAction,
        updateButton
    }
}

module.exports = htmlHandler;