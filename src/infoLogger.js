const htmlHandler = require("./htmlHandler");

function infoLogger() {
    const htmlHandlerInstance = htmlHandler();

    function updateGameAction(info) {
        htmlHandlerInstance.displayGameAction(info);
    }

    function updateGameState(info) {
        htmlHandlerInstance.displayGameState(info);
    }

    function getGameState() {
        return htmlHandlerInstance.getGameState();
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
        getGameState,
        updateActivePlayer,
        updateState,
        emptyLogger
    }
}

module.exports = infoLogger;