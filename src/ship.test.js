const Ship = require("./ship");

test("A ship needs a length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
})

test("A ship should only sink after being hit at the number of its length", () => {
    const TESTLENGTH = 3
    const ship = new Ship(TESTLENGTH);
    expect(ship.isSunk()).toBe(false);
    for (let i = 0; i < TESTLENGTH; i++) {
        ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
})