const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "mcachieve",
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
        const random = Math.floor((Math.random() * 40) + 1)
        const word = `${args.join("%20")}`
        message.delete()
        message.channel.send(`https://minecraftskinstealer.com/achievement/${random}/Achievement+Get%21/${word}`);
    }
}