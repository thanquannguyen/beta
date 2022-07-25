const { 
    Client,
    Message,
    MessageEmbed
} = require('discord.js')

const mongo = require('../../utils/mongo')
const simSchema = require('../../schemas/sim-schema')
const { languages } = require('../../language.json')
const { default: mongoose } = require('mongoose')
const language = require


module.exports = {
    name: "setsim",
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
        const { guild } = message
        
        const channelid = args[0]
        if (!channelid) return message.channel.send("Please input the channel id.")
        
        await mongo().then(async (mongoose) => {
            try {
                await simSchema.findOneAndUpdate(
                    {
                        _id: message.guild.id
                    },
                    {
                        _id: message.guild.id,
                        ChannelID: channelid
                    },
                    {
                        upsert: true
                    })
                message.channel.send("Sim channel has set.")
            }
            finally {
                mongoose.connection.close()
            }
        })
        


    }
}