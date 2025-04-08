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


        const ship = new Ship(length);
        ships[length] = ship;
        return true
    }

    function shipPositionValidator(length, position, horizontal) {
        if (horizontal) {
            if (position[0] + length >= FIELDLENGTH) {
                return false
            }
        } else {
            if (position[1] + length >= FIELDHEIGTH) {
                return false
            }
        } if (position[0] >= FIELDLENGTH || position[1] >= FIELDHEIGTH) {
            return false
        }
        
        return true
    }

    return {
        placeShip
    }
}

module.exports = gameboard;