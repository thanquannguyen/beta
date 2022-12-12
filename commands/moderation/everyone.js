const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "everyone",
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
        // let muterole = await message.guild.roles.create({
        //     name: 'Muted_SheepyD',
        //     color: 'BLACK',
        // });
        // muterole.setPosition(1)
        await message.guild.channels.cache.forEach(ch => {
            let temp = ch.name
            ch.permissionOverwrites.create(ch.guild.roles.everyone, {
                // SEND_MESSAGES: false,
                // ADD_REACTIONS: false,
                // SPEAK: false
                MENTION_EVERYONE: false,
                ATTACH_FILES: false,
                SEND_TTS_MESSAGES: false

            })
            let temp2 = temp.substring(1)
            ch.setName(temp2)
        })
        message.channel.send('Locked all channel.')
    }
}