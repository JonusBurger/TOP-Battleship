/**
 * @jest-environment jsdom
 */

const htmlHandler = require("./htmlHandler");


test("A Gamefield should be initialized as a node List", () => {

    const htmlHandlerInstance = htmlHandler();

    document.body.innerHTML =
    '<div class = "gameFrame">' +
        '<div id="player1">' +
        '  <div class="gameField"' +
        '  </div>' +
        '</div>' +
    '</div>';
    expect(htmlHandlerInstance.initGameField("player1")).toEqual(expect.any(Node))
})