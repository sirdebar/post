import { bot } from "../../index.js";
import config from "../../../../config.json" with { type: "json" };

export default {
    name: "decline",
    /**
     * @param { import("node-telegram-bot-api").CallbackQuery } query
     */
    async exec(query, [ userId ]) {
        await bot.sendMessage(userId, "❌️ Вам отказано");

        await bot.editMessageText([
            query.message.text,
            "**✅ Заявка была успешно отклонена**"
        ].join("\n\n"));
    }
}