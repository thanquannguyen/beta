const prefixSchema = require('../../schemas/prefix-schema')
const { Message } = require('discord.js')
const mongo = require('../../utils/mongo')
module.exports = {
    name : 'prefix',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        // const res = await args.join(" ")
        // if(!res) return message.channel.send('Please specify a prefix to change to.')
        // prefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
        //     if(err) throw err;
        //     if(data) {
        //         prefixSchema.findOneAndDelete({ Guild : message.guild.id })
        //         data = new prefixSchema({
        //             Guild : message.guild.id,
        //             Prefix : res
        //         })
        //         data.save()
        //         message.channel.send(`Your prefix has been updated to **${res}**`)
        //     } else {
        //         data = new prefixSchema({
        //             Guild : message.guild.id,
        //             Prefix : res
        //         })
        //         data.save()
        //         message.channel.send(`Custom prefix in this server is now set to **${res}**`)
        //     }
        // })

        const prefix = args[0]
        if (!prefix) return message.channel.send('Please type in the prefix')

        await mongo().then(async (mongoose) => {
            try {
                await prefixSchema.findOneAndUpdate(
                    {
                        Guild: message.guild.id    
                    }, 
                    {
                        Guild: message.guild.id,
                        Prefix: prefix
                    }, 
                    {
                        upsert: true
                    }
                )
                message.channel.send('Prefix has changed.')
            } finally {
                mongoose.connection.close()
            }
        })
    }
}