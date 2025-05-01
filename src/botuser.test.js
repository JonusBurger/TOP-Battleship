const botUser = require("./botuser");

test("A bot should place ships", () => {
    const botUserPlayer = new botUser("botTester");
    expect(botUserPlayer.placeShips()).toBeTruthy();
})

test("A bot should be able to do an attack move", () => {
    const botUserPlayer = new botUser("botTester");
    expect(botUserPlayer.getAttackMove()).toBeTruthy();
})

test("A bot should never attack the same position twice", () => {
    const botUserPlayer = new botUser("botTester");
    const firstMove = botUserPlayer.getAttackMove();
    expect(botUserPlayer.getAttackMove()).not.toBe(firstMove);
})

test("A bot should return a move that is close to the previous move if a ship as hit", () => {
    const botUserPlayer = new botUser("botTester");
    const move = botUserPlayer.getAttackMove([2,1]);
    expect(move[0]).toBeGreaterThanOrEqual(1);
    expect(move[0]).toBeLessThan(4);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(3);
})