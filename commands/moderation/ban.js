const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "ban",
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
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
        if (message.member.permissions.has('BAN_MEMBERS')) {
            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No reason given."
            if (user) {
                if (user.id == message.author.id) {
                    message.react("❌")
                    message.channel.send("You can't ban yourself.")
                    return;
                }
                message.guild.members.ban(user).catch(error => {console.log(error)})
                .then(user => {
                    let embed = new MessageEmbed
                    embed.setDescription(`${user} has been banned.`)
                    embed.setColor("GREEN")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed]});
                })
                
            } else message.channel.send("I can't find this user.")
        } else {
            message.channel.send("You don't have permission to ban this user.")
            return;
        }
    }
}