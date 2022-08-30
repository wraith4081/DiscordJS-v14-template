import { EmbedBuilder } from "discord.js";
import Config from "../config";
const { prefix } = Config;

export function execute (client) {
    client.on("messageCreate", async (message) => {
        const controls = [
            !message.guild,
            message.author.bot,
            !message.content.startsWith(prefix)
        ];

        Config.debug && console.log(`Message from ${message.author.tag} in ${message.guild.name} with content ${message.content}. The message is ${controls[0] ? "not " : ""}a guild message, ${controls[1] ? "" : "not "}a bot message and ${controls[2] ? "not " : ""}a command message.`);

        if (controls.includes(true)) return;

        let [ command, ...params ] = message.content.split(" ");
        command = command.slice(prefix.length).toLowerCase();
        if (client.commands.has(command)) {
            const aliases = client.aliases.get(command);
            const getCommand = client.commands.get(command);
            let cmd = client.commands.get(command);
            
            if (!cmd) {
                if (!client.aliases.has(command))
                    return new Error(`Command ${command} not found!`);
                else
                    cmd = client.commands.get(aliases);
            }

            cmd.execute(client, message, params);
        
        } else 
            return new Error("Command not found!");
    });
};