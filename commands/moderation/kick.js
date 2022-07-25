const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "kick",
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
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
        if (message.member.permissions.has('KICK_MEMBERS')) {
            if (user) {
                if (user.id == message.author.id) {
                    message.react('❌')
                    message.channel.send("You can't kick yourself")
                    return
                }
                message.guild.members.kick(user).catch(error => {console.log(error)}).then(user => {
                    let embed = new MessageEmbed
                    embed.setDescription(`${user} has been kick.`)
                    embed.setColor("GREEN")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed]})
                })
            } else message.channel.send("❌ We can't find that user.")
        }
        else {
            message.channel.send("You don't have permission to kick this user.")
            return;
        }
    }
}