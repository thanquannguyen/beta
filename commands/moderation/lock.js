const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "lock",
    // aliases: ['', ''],
    // category: "",
    // description: "",
    // usage: ``,
    // timeout: 1000,
    // emoji: "",

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        message.guild.channels.cache.forEach(ch => {
            try {
                ch.permissionOverwrites.create(ch.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false,
                })
                let temp = ch.name
                ch.setName(`🔒${temp}`).then(message.channel.send(`Locked ${ch}`))
                ch.send("This channel has been locked.")
            } catch {
            }
        })
        message.channel.send(`Locked done.`)
    }
}