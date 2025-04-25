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