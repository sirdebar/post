import { bot } from "../../index.js";
import states from "../../states.js";
import config from "../../../../config.json" with { type: "json" };

export default {
    name: "start",
    /**
     * @param { import("node-telegram-bot-api").Message} message 
     */
    async exec(message, [ time, direction ]) {
        if(!message.text) return;

        if(!time) {
            await bot.sendMessage(message.chat.id, "По каким направлениям работали до этого?");

            states.set(message.from.id, {
                action: "start",
                args: [ message.text ]
            });

            return;
        }

        if(!direction) {
            await bot.sendMessage(message.chat.id, "Готовы обучаться новому?");

            states.set(message.from.id, {
                action: "start",
                args: [ time, message.text ]
            });

            return;
        }

        await bot.sendMessage(config.requestsChat, [
            "*Новая заявка!*",
            `*Отправитель:* ${message.from.username ? `@${message.from.username} (${message.from.id})` : message.from.id}`,
            `*1. Сколько времени:*\n\`${time}\``,
            `*2. Направления:*\n\`${direction}\``,
            `*3: Обучаться:*\n\`${message.text}\``
        ].join("\n\n"), {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ Принять", callback_data: `accept:${message.from.id}` }],
                    [{ text: "❌ Отказать", callback_data: `decline:${message.from.id}` }],
                ]
            },

            parse_mode: "Markdown"
        });

        await bot.sendMessage(message.chat.id, "Ваша заявка была отправлена на рассмотрение администрации!");

        states.delete(message.from.id);
    }
}