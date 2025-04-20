const htmlHandler = require("./htmlHandler");

function infoLogger() {
    const htmlHandlerInstance = htmlHandler();

    function updateGameAction(info) {
        htmlHandlerInstance.displayGameAction(info);
    }

    function updateGameState(info) {
        htmlHandlerInstance.displayGameState(info);
    }

    function updateActivePlayer(player) {
        htmlHandlerInstance.updateActivePlayer(player);
    }

    function updateState(info) {
        htmlHandlerInstance.updateStateInfo(info);
    }

    function emptyLogger() {
        htmlHandlerInstance.displayGameAction("");
        htmlHandlerInstance.displayGameState("");
    }

    return {
        updateGameAction,
        updateGameState,
        updateActivePlayer,
        updateState,
        emptyLogger
    }
}

module.exports = infoLogger;