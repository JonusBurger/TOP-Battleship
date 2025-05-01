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

    randomPositionCloseTo(moveList) {
        if (moveList.length === 1) {
            let valueX = moveList[0][0] + Math.floor(Math.random()*3) - 1;
            let valueY = moveList[0][1] + Math.floor(Math.random()*3) - 1;
            valueX = valueX > 9 ? 9 : valueX;
            valueX = valueX < 0 ? 0 : valueX;
            valueY = valueY > 9 ? 9 : valueY;
            valueY = valueY < 0 ? 0 : valueY;

            return [valueX, valueY]
        } else {
            let move = this.findStructrue(moveList);
            return move
        }        
    }

    findStructrue(moveList) {
        const firstMove = moveList[0];
        const lastMove = moveList[moveList.length - 1];
        const diffX = lastMove[0] - firstMove[0];
        const diffY = lastMove[1] - firstMove[1];
        let valueX;
        let valueY;
        if (diffX != 0) {
            let step = diffX > 0 ? 1 : - 1;
            valueX = lastMove[0] + step;
            if (valueX === this.moves[this.moves.length - 1][0] || valueX < 0 || valueX > 9) {
                valueX = firstMove[0] - step;
            }
            valueY = lastMove[1]; 
        } else {
            let step = diffY > 0 ? 1 : - 1;
            valueY = lastMove[1] + step;
            if (valueY === this.moves[this.moves.length - 1][1] || valueY < 0 || valueY > 9) {
                valueY = firstMove[1] - step;
            }
            valueX = lastMove[0];             
        }
        
        return [valueX, valueY]

    }

    randomTrue() {
        const randomValue = Math.random();
        return randomValue >= 0.5 ? true : false
    }

    getAttackMove(lastMoves = []) {
        let move;
        while (!move) {
            if (lastMoves.length > 0) {
                move = this.randomPositionCloseTo(lastMoves);
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