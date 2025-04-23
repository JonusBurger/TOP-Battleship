/**
 * @jest-environment jsdom
 */

const Gameboard = require("./gameboard");

describe("test Gameboard with document.body", () => {
    beforeEach(() => {
      // Mock document Body for InfoLogger
      document.body.innerHTML =
      '<div class = "gameFrame">' +
          '<div id="gameState">' +
          '</div>' +
          '<div id = "gameAction">' +
          '</div>' +
      '</div>';

    });
  
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

test("A ship cannot be placed next to another ship", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,1], horizontal = true);
    
    expect(gameboardInstance.placeShip(3, [4,1], horizontal = true)).toBeFalsy();
})

test("each ship may only occur once", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,0], horizontal = true);
    gameboardInstance.placeShip(3, [1,2], horizontal = true);

    expect(gameboardInstance.placeShip(3, [4,5], horizontal = true)).toBeFalsy();
})

test("You should not be able to attack the same spot twice", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,0], horizontal = true);
    expect(gameboardInstance.receiveAttack([1,0])).toBeTruthy();
    expect(gameboardInstance.receiveAttack([1,0])).toBeFalsy();
})

test("Game should tell if all ships are sunk after an attack", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,0], horizontal = true);
    gameboardInstance.receiveAttack([1,0]);
    gameboardInstance.receiveAttack([2,0]);
    expect(gameboardInstance.isOver()).toBeFalsy();
    gameboardInstance.receiveAttack([3,0]);
    // GAME OVER! All ships sunk
    expect(gameboardInstance.isOver()).toBeTruthy();
})

test("Gameboard should return true when all ships have been placed", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(3, [1,0], horizontal = false);
    gameboardInstance.placeShip(3, [3,0], horizontal = false);
    gameboardInstance.placeShip(2, [5,0], horizontal = false);
    expect(gameboardInstance.nextShipToPlace()).not.toBeFalsy();
    gameboardInstance.placeShip(4, [7,0], horizontal = false);
    gameboardInstance.placeShip(5, [9,0], horizontal = false);
    expect(gameboardInstance.nextShipToPlace()).toBeFalsy();
})

test("Gameboard should return the next undefined ship, expected Submarine", () => {
    const gameboardInstance = Gameboard();
    gameboardInstance.placeShip(2, [1,0], horizontal = false);
    expect(gameboardInstance.nextShipToPlace()).toBe("Submarine");
})

test ("A ship should be placed at the outer end while still being okay", () => {
    const gameboardInstance = Gameboard();
    expect(gameboardInstance.placeShip(3, [0,7], horizontal = false)).toBeTruthy();
})

});