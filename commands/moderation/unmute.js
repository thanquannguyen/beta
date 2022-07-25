const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const ms = require("ms")

module.exports = {
    name: "unmute",
    aliases: ['untimeout', 'removetimeout'],
    category: "Moderation",
    // description: "",
    // usage: ``,
    // timeout: 1000,
    // emoji: "",
    // userPermission: ['', ''],
    // botPermission: ['', ''],
    // premium: false,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        let user = message.mentions.members.first();
        let reason = args.slice(1).join(" ")
        if (!reason) reason = "No reason."
        user.timeout(null);
        // user.timeout(null);
        message.channel.send(`${user}'s timeout has been removed.\nReason: ${reason}`);
    }
}