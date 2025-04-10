const gameBoard = require("./gameboard");

class Player{
    constructor(name, isBot = false) {
        this.name = name;
        this.Computer = isBot;
        this.gameBoard = gameBoard();
    }

    isBot() {
        return this.Computer
    }

    getGameBoard() {
        return this.gameBoard.getGameBoard()
    }
}

module.exports = Player;