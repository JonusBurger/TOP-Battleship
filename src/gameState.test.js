const gameState = require("./gameState");

test("GameState should have an active player", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getActivePlayer().name).toBe("player1");
})

test("GameState should have a list of active Players", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getPlayerList().length).toBe(2)
})

test("GameState should return the id of the active Placer", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getActivePlayerId()).toBe("player1");
})

test("GameState should keep track of active player", () => {
    const gameStateInstance = gameState();
    gameStateInstance.switchTurn();
    expect(gameStateInstance.getActivePlayer().name).toBe("player2");
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

test("Gamestate should return an inactive player", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getInactivePlayer().name).toBe("player2");
})

test("Gamestate should keep track of both active and inactive player", () => {
    const gameStateInstance = gameState();
    expect(gameStateInstance.getInactivePlayer()).not.toBe(gameStateInstance.getActivePlayer());
})



