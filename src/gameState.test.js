const gameState = require("./gameState");

test("GameState should have an active player", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getActivePlayer().name).toBe("Player1");
})

test("GameState should keep track of active player", () => {
    const gameStateInstance = gameState();
    gameStateInstance.switchTurn();
    expect(gameStateInstance.getActivePlayer().name).toBe("Player2");
})

test("GameState should keep track of the current state of the game", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getGameState()).toBe("Place Ships");
})

test("After ships are placed, game should switch to gameState Attack opponent", () => {
    const gameStateInstance = gameState();
    gameStateInstance.autoPlaceShips();
    expect(gameStateInstance.getGameState()).toBe("Attack opponent!");
})

