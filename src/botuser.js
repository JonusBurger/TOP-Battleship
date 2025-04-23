const Player = require("./player");

class BotUser extends Player{
    constructor(name, isBot = true) {
        super();
        this.moves = []
    }

    placeShips() {
        let ship = this.gameBoard.nextShipToPlace();
        while(ship) {
            const shipLength = this.gameBoard.getLengthOfShip(ship);
            this.gameBoard.placeShip(
                shipLength,
                this.randomPosition(), 
                this.randomTrue(),
                this.isBot
            )
            ship = this.gameBoard.nextShipToPlace();
        }

        return true
    }

    randomPosition() {
        let valueX = Math.floor(Math.random()*10);
        let valueY = Math.floor(Math.random()*10);

        return [valueX, valueY]
    }

    randomTrue() {
        const randomValue = Math.random();
        return randomValue >= 0.5 ? true : false
    }
}

module.exports = BotUser;