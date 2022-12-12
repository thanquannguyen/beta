const { MessageEmbed } = require('discord.js')
const prefix = process.env.prefix
const axios = require('axios')

module.exports = {
    name: "itunes",
    category: "fun",
    description: "Itunes.",
    usage: `${prefix}itunes`,
    timeout: 10000,
    emoji: "🏓",
    async run(client, message, args) {
        let song = args.join(" ")
        if(!song) return message.reply('Please enter a song')

        const body = await axios({
            url: `https://api.popcatdev.repl.co/itunes?q=${song}`,
            method: "GET",
            mode: "no-cors"
        })
        // const body = await axios(`https://api.popcatdev.repl.co/itunes?q=${song}`)
        const res = body.data;    

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setThumbnail(`${res.thumbnail}`)
        .setTitle('iTunes')
        .setDescription(`Giving info from iTunes for \`${song}\``)
        .addField('**Song:**', `${res.name}`, inline = true)
        .addField('**Artist:**', `${res.artist}`, inline = true)
        .addField('**Album:**', `${res.album}`, inline = true)
        .addField('**Release Date:**', `${res.release_date}`, inline = true)
        .addField('**Price:**', `${res.price}`, inline = true)
        .addField('**Length:**', `${res.length}`, inline = true)
        .addField('**Genre:**', `${res.genre}`, inline = true)
        .addField('**URL:**', `${res.url}`, inline = true)
        message.channel.send({embeds: [embed]})
    }
}
