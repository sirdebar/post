import fs from "fs";
import start from "./routes/commands/start.js";
import states from "./states.js";
import TelegramBot from "node-telegram-bot-api";

class Router {
    async #get(event) {
        const data = new Map();
        const dir = fs.readdirSync(`./src/bot/routes/${event}`);

        for(let file of dir) {
            const info = (await import(`./routes/${event}/${file}`)).default;

            data.set(info.name, info.exec);
        }

        return data;
    }

    /**
     * 
     * @param { TelegramBot } bot 
     */
    async route(bot) {
        const commands = await this.#get("commands");
        const callbacks = await this.#get("callbacks");
        const fileStates = await this.#get("states");

        bot.on("message", async message => {
            const command = commands.get(message.text);
            const state = states.get(message.from.id);
            
            if(command) {
                states.delete(message.from.id);
                await command(message);
                return;
            }

            if(state) {
                await fileStates.get(state.action)(message, state.args);
                return;
            }
        });

        bot.on("callback_query", async query => {
            const args = query.data.split(":");
            const name = args[0];

            args.shift();
            callbacks.get(name)?.(query, args);
        });
    }
}

export default Router;