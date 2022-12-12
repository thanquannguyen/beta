const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "coinflip",
    aliases: ['flip', ''],
    category: "fun",
    description: "Flip a coin to see if it's heads or tails",
    // usage: ``,
    timeout: 500,
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
        const choices= ["heads", "tails"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        return message.channel.send({embeds: [new MessageEmbed()
        .setTitle("Coinflip!")
        .setDescription(`You flipped a **${choice}**!`)
        .setThumbnail("https://i.pinimg.com/originals/d7/49/06/d74906d39a1964e7d07555e7601b06ad.gif")
        // .setFooter(es.footertext, es.footericon)]
        // .setFooter({text: es.footertext, iconURL: es.footericon})
        ]

    })
    }
}