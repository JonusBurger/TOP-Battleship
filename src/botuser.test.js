const botUser = require("./botuser");

test("A bot should place ships", () => {
    const botUserPlayer = new botUser("botTester");
    expect(botUserPlayer.placeShips()).toBeTruthy();
})