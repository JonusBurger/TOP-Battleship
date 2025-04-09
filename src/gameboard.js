const Ship = require("./ship");

function gameboard() {
    const FIELDHEIGTH = 10;
    const FIELDLENGTH = 10;
    const ships = {
        2: undefined,
        3: undefined,
        4: undefined, 
        5: undefined
    }
    let gameField = Array(FIELDHEIGTH).fill(Array(FIELDLENGTH).fill(0));


    function placeShip(length, position, horizontal = false) {
        if (!(length in ships)) {
            return false
        }

        if (!shipPositionValidator(length, position, horizontal)) {
            return false
        }


        for (let i = 0; i < length; i++) {
            if (horizontal) {
                placeMarker([position[0] + i, position[1]], length*10)
            } else {
                placeMarker([position[0], position[1] + i], length*10)
            }
        } 
        const ship = new Ship(length);
        ships[length] = ship;
        return true
    }

    function shipPositionValidator(length, position, horizontal) {
        if (horizontal) {
            if (position[0] + length >= FIELDLENGTH) {
                return false
            }
            for (let i = 0; i < length; i++) {
                if (!checkGameField([position[0] + i, position[1]])) {
                    return false
                }
            }
        } else {
            if (position[1] + length >= FIELDHEIGTH) {
                return false
            }
            for (let i = 0; i < length; i++) {
                if (!checkGameField([position[0], position[1] + i])) {
                    return false
                }
            }
        } if (position[0] >= FIELDLENGTH || position[1] >= FIELDHEIGTH) {
            return false
        }

        return true
    }

    function checkGameField(position) {
        const CHECKFIELDSAROUNDPOSITION = [
            [-1,1], [0,1], [1,1],
            [-1,0], [0,0], [1,0],
            [-1,-1], [0,-1], [1,-1]
        ]
        for (let pair of CHECKFIELDSAROUNDPOSITION) {
            let x = position[0] + pair[0];
            let y = position[1] + pair[1];
            if (x >= 0 && x < FIELDLENGTH && y >= 0 && y < FIELDHEIGTH) {
                if (gameField[x][y] >= 20) {
                    return false
                }
            }
            
        }

        return true
    }

    function placeMarker(position, marker) {
        gameField[position[0]][position[1]] = marker;
    }

    return {
        placeShip
    }
}

module.exports = gameboard;