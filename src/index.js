import "./style.css";

const htmlHandler = require("./htmlHandler");
const eventHandler = require("./eventhandler");

const htmlHandlerInstance = htmlHandler();
htmlHandlerInstance.initGameField("player1");
htmlHandlerInstance.initGameField("player2");

htmlHandlerInstance.updateGameField("player1", [3,3], "x");
eventHandler();