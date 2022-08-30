import { Client, GatewayIntentBits, Partials } from "discord.js";
import Config from "./config";
import { config as envconfig } from 'dotenv';
import fs from 'fs';

const events = 
    fs.readdirSync('./events')
    .filter(
        file => file.endsWith('.ts')
    );

Config.debug && console.log(`Successfully finded ${events.length} events at events folder!`);

if (Config.enableENV) {
    envconfig();
    Config.debug && console.log("Loaded .env file");
}

const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds, // REQUIRED FOR BOT TO WORK
    //GatewayIntentBits.GuildMembers,
    //GatewayIntentBits.GuildBans,
    //GatewayIntentBits.GuildEmojisAndStickers,
    //GatewayIntentBits.GuildIntegrations,
    //GatewayIntentBits.GuildWebhooks,
    //GatewayIntentBits.GuildInvites,
    //GatewayIntentBits.GuildVoiceStates,
    //GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    //GatewayIntentBits.GuildMessageReactions,
    //GatewayIntentBits.GuildMessageTyping,
    //GatewayIntentBits.DirectMessages,
    //GatewayIntentBits.DirectMessageReactions,
    //GatewayIntentBits.DirectMessageTyping,

    GatewayIntentBits.MessageContent, // REQUIRED FOR BOT TO WORK, 
    //You may need to enable this intent in your bot's application page. 
    //Option is under of Privileged Gateway Intents section with MESSAGE CONTENT INTENT switch.
  ],
});

export default client;

events.forEach(
    event => {
        const eventFile = require(`./events/${event}`);
        const eventName = event.split('.')[0];

        Config.debug && console.log(`Loading event ${eventName}`);

        if (eventName) {
            eventFile.execute(client);
        } else {
            if (Config.disableErrors) {
                console.log(`Event name is undefined for ${event}`);
            } else {
                throw new Error(`Event name is undefined for ${event}`);
            }
        }
    }
);

const token = Config.enableENV
    ? process.env.TOKEN
    : Config.token;

if (!token) {
    throw new Error("No token provided!");
}

client.login(token).then(() => console.log("The bot is ready!")).catch(e => {
    throw new Error("Something went wrong while logging in! The error code is: \x1b[31m" + e);
})