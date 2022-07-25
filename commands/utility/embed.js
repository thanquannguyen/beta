const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "embed",
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
            message.channel.send('You are mentioning roles, this is prohibited.')
            return
        }
        let embed = new MessageEmbed();
        embed.setDescription(`${args.join()}`)
        embed.setColor("RANDOM")
        if (!args.join(' ')) {
            message.delete(message.author)
            return
        }
        else message.channel.send({embeds: [embed]}).then(message.delete(message.author))
    }
}