/**
 * @jest-environment jsdom
 */

const gameState = require("./gameState");

describe("test Gameboard with document.body", () => {
    beforeEach(() => {
      // Mock document Body for InfoLogger
      document.body.innerHTML =
      '<div class = "gameFrame">' +
          '<div id="gameState">' +
          '</div>' +
      '</div>';
    });

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

    test("Gamestate should know when the game is Over", () => {
        const gameStateInstance = gameState();
        gameStateInstance.getActivePlayer().gameBoard.placeShip(3, [2,2]);
        gameStateInstance.switchTurn();
        gameStateInstance.getActivePlayer().gameBoard.placeShip(3, [2,2]);
        gameStateInstance.activeState = 2;
        gameStateInstance.attackMove([2,2]);
        gameStateInstance.attackMove([2,2]);
        gameStateInstance.attackMove([2,3]);
        gameStateInstance.attackMove([2,3]);
        expect(gameStateInstance.attackMove([2,4])).toBeTruthy();
    })

});

