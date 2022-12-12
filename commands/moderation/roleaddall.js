const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    // name: "",
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
        const role = message.mentions.roles.first()
        if(!message.member.hasPermission("MANAGE_ROLES")) {
            message.reply(`You do not have the permission \`MANAGE_ROLES\``)
        } else if(!role) {
            message.reply('\`❌ No role specified\`')
        } else {
            let roleallem = new MessageEmbed().setDescription(`:white_check_mark: Added the role ${role} to everyone in the server!`).setColor("#2f3136").setTimestamp()
            message.channel.send(roleallem).then(() => {
            message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))
        })
        }
    }
}