import { Collection } from "discord.js";
import fs from "fs";
import Config from "../config";
export function execute (client, ...args) {
    client.commands = new Collection();
    client.aliases = new Collection();

    fs.readdir("./commands/", (err, files) => {
        if (err) 
            console.error(err);
        
        files.forEach(f => {
            const props = require(`../commands/${f}`);
                    
            Config.debug && console.log(`Loading command ${props.help.name}`);

            client.commands.set(props.help.name, props);

            props.conf.aliases.forEach(alias => 
                client.aliases.set(alias, props.help.name)
            );

            Config.debug && console.log(`Loaded command ${props.help.name}`);
        });
    });
}