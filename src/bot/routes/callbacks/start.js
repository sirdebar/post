import { bot } from "../../index.js";
import states from "../../states.js";

export default {
    name: "start",
    /**
     * @param { import("node-telegram-bot-api").CallbackQuery } query
     */
    async exec(query) {
        await bot.deleteMessage(query.message.chat.id, query.message.message_id);
        await bot.sendMessage(query.message.chat.id, "Сколько времени готовы уделять работе?");

        states.set(query.from.id, {
            action: "start",
            args: []
        });
    }
}