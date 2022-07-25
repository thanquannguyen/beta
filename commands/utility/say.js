const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "say",
    // aliases: ['', ''],
    // category: "",
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
        if (message.content.toLowerCase().includes('<@&') || message.content.toLowerCase().includes('@everyone') || message.content.toLowerCase().includes('@here')) {
            message.channel.send("You are mentioning roles, this is prohibited.")
            return;
        }
        if (!args.join(' ')) {
            message.delete(message.author)
            return
        }
        else message.channel.send({content: args.join(' ')}).then(message.delete(message.author))
    }
}