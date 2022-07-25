const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const querystring = require('querystring')
const fetch = require('node-fetch')

module.exports = {
    name: "sim",
    aliases: ['simsimi', ''],
    category: "fun",
    description: "Talk with simsimi",
    // usage: ``,
    timeout: 500,
    emoji: "💭",
    // userPermission: ['', ''],
    // botPermission: ['', ''],
    // premium: false,

    /**
    * @param {Client} client
    * @param {Message} message
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        if (!args[0]) {
            let embed = new MessageEmbed;
            embed.setDescription(":x: Nhập gì đó để sim trả lời.")
            message.channel.send({embeds: [embed]})
            return;
        }
        const query = querystring.stringify({text: args.join(' ')})
        const { success } = await fetch(`https://api.simsimi.net/v2/?${query}&lc=vn`).then(success => {if (success) return success.json()}).catch(error => console.log(error))
        if (success) {
          message.reply(success).catch(error => console.log(error));
        } else return;
    }
}