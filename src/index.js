import { bot, Router } from "./bot/index.js";
console.clear();

const router = new Router();
await router.route(bot);

console.log("Info | Бот запущен");