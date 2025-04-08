const Gameboard = require("./gameboard");

test("A ship may only palced if it has a valid length", () => {
    const gameboardInstance = Gameboard();

    expect(gameboardInstance.placeShip(6, [1,1], horizontal = true)).toBeFalsy();
})

test("A ship may only be placed at a valid position", () => {
    const gameboardInstance = Gameboard();

    expect(gameboardInstance.placeShip(3, [1,1], horizontal = true)).toBeTruthy();
}) 