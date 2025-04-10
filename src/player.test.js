const Player = require("./player");

test("A Player should have a name", () => {
    const newPlayer = new Player("Jim")
    expect(newPlayer.name).toBe("Jim")
})

test("A Player should be set as a bot", () => {
    const newPlayer = new Player("Admiral Carl", true);
    expect(newPlayer.isBot()).toBeTruthy()
})

test("A Player should have his own Gameboard", () => {
    const newPlayer = new Player("Admiral Carl", true);
    expect(newPlayer.getGameBoard()).toEqual(expect.any(Array));
})