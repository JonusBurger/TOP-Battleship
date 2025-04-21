const Gameboard = require("./gameboard");
const infoLogger = require("./infoLogger");

describe("Gameboard placeShip", () => {
    let spy;

    const infoLoggerInstance = infoLogger();
  
    beforeEach(() => {
      // Mock the infoLogger before each test
      spy = jest.spyOn(infoLoggerInstance, 'updateGameState');
    });
  
    afterEach(() => {
      // Clean up the mock after each test
      spy.mockRestore();
    });

    test("A ship may only palced if it has a valid length", () => {
        const gameboardInstance = Gameboard();
        // const spy = jest.spyOn(infoLoggerInstance, 'updateGameState');
        spy.mockReturnValue(true);
        expect(gameboardInstance.placeShip(6, [1,1], horizontal = true)).toBeFalsy();
    })


test("A ship may only be placed at a valid position", () => {
    const gameboardInstance = Gameboard();
    // const spy = jest.spyOn(infoLogger.infoLoggerInstance, 'updateGameState');
    spy.mockReturnValue(true);
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
    expect(gameboardInstance.checkIfAllShipsPlaced()).toBeFalsy();
    gameboardInstance.placeShip(4, [7,0], horizontal = false);
    gameboardInstance.placeShip(5, [9,0], horizontal = false);
    expect(gameboardInstance.checkIfAllShipsPlaced()).toBeTruthy();
})

});