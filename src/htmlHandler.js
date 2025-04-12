function htmlHandler() {
    const FIELDHEIGTH = 10;
    const FIELDLENGTH = 10;

    function initGameField(playerID) {
        const gameFrame = document.getElementById(playerID);
        const gameField = gameFrame.querySelector(".gameField");
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
        return gameField
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

    return {
        initGameField,
        updateGameField
    }
}

module.exports = htmlHandler;