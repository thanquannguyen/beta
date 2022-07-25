const prefixSchema = require('../../schemas/prefix-schema')
const { Message } = require('discord.js')
const mongo = require('../../utils/mongo')
module.exports = {
    name : 'prefixreset',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        await mongo().then(async (mongoose) => {
            try {
                await prefixSchema.findOneAndDelete(
                    {
                        Guild: message.guild.id    
                    }
                )
                message.channel.send('Prefix has reset.')
            } finally {
                mongoose.connection.close()
            }
        })
    }
}