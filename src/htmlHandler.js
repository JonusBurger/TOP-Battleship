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
                gameCell.classList.add(`${i}${j}`);

                gameRow.appendChild(gameCell);
            }
            gameField.appendChild(gameRow);
        }
        return gameField
    }

    return {
        initGameField
    }
}

module.exports = htmlHandler;