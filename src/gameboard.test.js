const Gameboard = require("./gameboard");

test("A ship may only palced if it has a valid length", () => {
    const gameboardInstance = Gameboard();

    expect(gameboardInstance.placeShip(6, [1,1], horizontal = true)).toBeFalsy();
})

test("A ship may only be placed at a valid position", () => {
    const gameboardInstance = Gameboard();

    expect(gameboardInstance.placeShip(3, [1,1], horizontal = true)).toBeTruthy();
    expect(gameboardInstance.placeShip(3, [1,9], horizontal = false)).toBeFalsy();
}) 

test("A ship cannot be placed upon another ship", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,1], horizontal = true)
    
    expect(gameboardInstance.placeShip(3, [0,1], horizontal = true)).toBeFalsy();
}) 