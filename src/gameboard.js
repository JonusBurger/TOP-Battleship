function gameboard() {
    const ships = {
        2: undefined,
        3: undefined,
        4: undefined, 
        5: undefined
    }


    function placeShip() {
        return false
    }

    return {
        placeShip
    }
}

module.exports = gameboard;