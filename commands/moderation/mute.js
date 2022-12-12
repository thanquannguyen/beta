const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const ms = require("ms")

module.exports = {
    name: "mute",
    aliases: ['timeout'],
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
        try {
            if (message.member.permissions.has('MODERATE_MEMBERS')) {
                let user = message.mentions.members.first();
                let reason = args.slice(2).join(" ");
                let time = args[1]
                if (!time) time = '15m'
                if (!reason) reason = "No reason";
                user.timeout(ms(time));
                // user.timeout(null);
                message.channel.send(`${user} has been timed out for ${ms(ms(time))}.\nReason: ${reason}`);
                } else {
                    message.channel.send("You don't have permission")
                    return;
                }
        }
        catch (err) {
            if (err) message.channel.send("Something went wrong.")
        }
    } 
}