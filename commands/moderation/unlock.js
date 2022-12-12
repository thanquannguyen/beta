const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "unlock",
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
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true,
                    CONNECT: true,
                })
                let temp = ch.name
                ch.setName(`${temp.replace('🔒', '')}`).then(message.channel.send(`Unlocked ${ch}`))
                ch.send("This channel has been unlocked.")
            } catch {
            }
            })
        message.channel.send(`Unlocked done.`)
    }
}