const { 
    Client,
    Message,
    MessageEmbed,
    DiscordAPIError
} = require('discord.js')

module.exports = {
    name: "purge",
    // aliases: ['', ''],
    category: "moderation",
    // description: "",
    // usage: ``,
    // timeout: 1000,
    // emoji: "",
    userPermission: ['ADMINISTRATOR', 'MANAGE_MESSAGES'],
    // botPermission: ['', ''],
    // premium: false,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        if(message.member.permissions.has("MANAGE_MESSAGES")) {
            if (+args[0] <= 100 && +args[0] >= 1) {
                message.channel.bulkDelete(+args[0] + 1).catch(error => {if(error) {
                    message.channel.send("You can only bulk delete messages that are under 14 days old.")
                    return;
                }}).then(msgs => {
                    let embed = new MessageEmbed();
                    embed.setDescription(`Deleted ${msgs.size -1} messages`);
                    embed.setColor("RANDOM")
                    embed.setFooter({
                        text: `Requested by ${message.author.tag}`,
                        iconURL: message.author.displayAvatarURL({dynamic: true, size: 4096})
                    })
                    embed.setTimestamp();
                    message.channel.send({embeds: [embed]})
                    .then(msg => {
                        setTimeout(() => {
                            msg.delete({ embeds: [embed]})
                        }, 4000)
                    })
                })
            }
            else message.channel.send("Please choose a number >= 1 and <= 100")
        } else {
            message.channel.send("You don't have permission.")
            return;
        }

    }
}