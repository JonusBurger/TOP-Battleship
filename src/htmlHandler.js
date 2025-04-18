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

    function updateEntireField(playerID, player) {
        const gameFrame = document.getElementById(playerID);
        const gameField = player.getGameBoard();
        for (let i = 0; i < FIELDHEIGTH; i++) {
            for (let j = 0; j < FIELDLENGTH; j++) {
                const gameCell = gameFrame.querySelector(`.fieldPosition_${i}${j}`)
                const fieldValue = gameField[i][j];
                if (fieldValue >= 20) {
                    gameCell.innerHTML = "X";
                }
                if (fieldValue === 1) {
                    gameCell.innerHTML = "O";
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

    return {
        initGameField,
        updateGameField,
        updateEntireField,
        updateActivePlayerBanner
    }
}

module.exports = htmlHandler;