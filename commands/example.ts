import Config from "../config";

const {EmbedBuilder} = require("discord.js");

export const execute = async (client, message, ...args) => {

    Config.debug && console.log(`Command ${help.name} executed by ${message.author.tag} in ${message.guild.name} with args`, args);

    const embed = new EmbedBuilder()
    .setTitle("Command Title")
    .setDescription("Hi!")
    .setColor("#007fff")
    .setTimestamp()
    return message.channel.send({embeds : [embed]});
};

export const conf = {
  aliases: []
};

export const help = {
  name: "test"
};