const Ship = require("./ship");
const infoLogger = require("./infoLogger");

function gameboard() {
    const FIELDHEIGTH = 10;
    const FIELDLENGTH = 10;
    const MAPSHIPS = {
        20: "Patrol Boat",
        30: "Submarine",
        31: "Destroyer",
        40: "Battleship",
        50: "Carrier"
    }

    const ships = {
        "Patrol Boat": undefined,
        "Submarine": undefined,
        "Destroyer": undefined,
        "Battleship": undefined, 
        "Carrier": undefined
    }

    let gameField = Array.from({ length: FIELDHEIGTH }, () => Array(FIELDLENGTH).fill(0));
    const infoLoggerInstance = infoLogger();

    function getLengthOfShip(shipName) {
        for (const [key, value] of Object.entries(MAPSHIPS)) {
            if (shipName === value) {
                return Math.floor(key / 10)
            }
        }
    }
    
    function placeShip(length, position, horizontal = false, isBot = false) {
        if (length < 2 || length > 5) {
            return false
        }
        if (typeof(position) === typeof("22")) {
            position = [parseInt(position[0]), parseInt(position[1])];
        }
        
        if (!shipPositionValidator(length, position, horizontal, isBot)) {
            return false
        }

        

        const ship = new Ship(length);
        let shipID= ship.length*10;
        // Edge Case for both types of ships with length 3
        if (shipID === 30 && ships[MAPSHIPS[shipID]]) {
            shipID++;
        }

        if (!storeShip(ship, shipID)) {
            return false
        }

        for (let i = 0; i < length; i++) {
            if (horizontal) {
                placeMarker([position[0] + i, position[1]], shipID)
            } else {
                placeMarker([position[0], position[1] + i], shipID)
            }
        } 

        return true
    }
    
    function nextShipToPlace() {
        for (const [key, ship] of Object.entries(ships)) {
            if (!ship) {
                return key
            }
        }

        return false
    }

    function shipPositionValidator(length, position, horizontal, isBot) {
        if (horizontal) {
            if (position[0] + length > FIELDLENGTH) {
                if (!isBot) {
                    infoLoggerInstance.updateGameState("ship is out of the field!");
                }
                
                return false
            }
            for (let i = 0; i < length; i++) {
                if (!checkGameField([position[0] + i, position[1]])) {
                    if (!isBot) {
                        infoLoggerInstance.updateGameState("Ship is too close to another Ship!");
                    }
                    return false
                }
            }
        } else {
            if (position[1] + length > FIELDHEIGTH) {
                if (!isBot) {
                    infoLoggerInstance.updateGameState("ship is out of the field!");
                }
                return false
            }
            for (let i = 0; i < length; i++) {
                if (!checkGameField([position[0], position[1] + i])) {
                    if (!isBot) {
                        infoLoggerInstance.updateGameState("Ship is too close to another Ship!");
                    }
                    return false
                }
            }
        } if (position[0] >= FIELDLENGTH || position[1] >= FIELDHEIGTH) {
            if (!isBot) {
                infoLoggerInstance.updateGameState("Ship is out of bounds!");
            }
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

    function storeShip(ship, shipID) {
        if (!ships[MAPSHIPS[shipID]]) {
            ships[MAPSHIPS[shipID]] = ship;

            return true
        } 
        return false
    }

    function receiveAttack(position) {
        let x = position[0];
        let y = position[1]; 
        
        const id = gameField[x][y];
        if (id === 1 || id === 2) {
            infoLoggerInstance.updateGameState("Field already attacked!");
            return false;
        }
        if (id >= 20) {
            ships[MAPSHIPS[id]].hit();
            gameField[x][y] = 1;
            infoLoggerInstance.updateGameState("Hit a ship!");
            if (ships[MAPSHIPS[id]].isSunk()) {
                infoLoggerInstance.updateGameState("Ship sunk!");
            }
        } else {
            gameField[x][y] = 2;
            infoLoggerInstance.updateGameState("Nothing Hit!");
        }

        return true
    }

    function isOver() {
        for (let key in ships) {
            let ship = ships[key];
            // Skip entries with no ship
            if (!ship) {
                continue
            }
            if (!ship.isSunk()) {
                return false
            }
        }

        return true
    }

    function getGameBoard() {
        return gameField
    }

    function getShips() {
        return ships
    }


    return {
        placeShip,
        nextShipToPlace,
        receiveAttack,
        isOver,
        getGameBoard,
        getShips,
        getLengthOfShip,
    }
}

module.exports = gameboard;