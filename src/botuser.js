const Player = require("./player");

class BotUser extends Player{
    constructor(name, isBot = true) {
        super(name, isBot = true);
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

    getAttackMove() {
        let move;
        while (!move) {
            move = this.randomPosition();
            for (let moveEntry of this.moves) {
                if (moveEntry[0] === move[0] && moveEntry[1] === move[1]) {
                    move = false;
                    break
                }
            }
        }

        this.moves.push(move);
        return move
    }
}

module.exports = BotUser;