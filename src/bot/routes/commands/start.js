import { bot } from "../../index.js";

export default {
    name: "/start",
    /**
     * @param { import("node-telegram-bot-api").Message} message 
     */
    async exec(message) {
        await bot.sendMessage(message.chat.id, "Рады вашему визиту в Inspire Team, готовы заполнить заявку в команду?", {
            reply_markup: {
                inline_keyboard: [[{ text: "Начать", callback_data: "start" }]]
            }
        });
    }
}