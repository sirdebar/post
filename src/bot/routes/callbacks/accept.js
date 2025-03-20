import { bot } from "../../index.js";
import config from "../../../../config.json" with { type: "json" };

export default {
    name: "accept",
    /**
     * @param { import("node-telegram-bot-api").CallbackQuery } query
     */
    async exec(query, [ userId ]) {
        await bot.sendMessage(userId, [
            `*✅ Вы приняты* ссылка на чат: ${config.approvedChatUrl}`,
            "⚡️ В закрепе вся информация для работы."
        ].join("\n\n"), {
            parse_mode: "Markdown"
        });

        await bot.editMessageText([
            query.message.text,
            "**✅ Заявка была успешно одобрена**"
        ].join("\n\n"));
    }
}