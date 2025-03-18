import Router from "./Router.js";
import TelegramBot from "node-telegram-bot-api";
import config from "../../config.json" with { type: "json" };

const bot = new TelegramBot(config.token, {
    polling: true
});

export { Router, bot };