import "./style.css";

const htmlHandler = require("./htmlHandler");

const htmlHandlerInstance = htmlHandler();
htmlHandlerInstance.initGameField("player1");
htmlHandlerInstance.initGameField("player2");