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

    randomPositionCloseTo(position) {
        let valueX = position[0] + Math.floor(Math.random()*3) - 1;
        let valueY = position[1] + Math.floor(Math.random()*3) - 1;
        valueX = valueX > 9 ? 9 : valueX;
        valueX = valueX < 0 ? 0 : valueX;
        valueY = valueY > 9 ? 9 : valueY;
        valueY = valueY < 0 ? 0 : valueY;

        return [valueX, valueY]
    }

    randomTrue() {
        const randomValue = Math.random();
        return randomValue >= 0.5 ? true : false
    }

    getAttackMove(lastMove = undefined) {
        let move;
        while (!move) {
            if (lastMove) {
            move = this.randomPositionCloseTo(lastMove);
            } else {
                move = this.randomPosition();
            }
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