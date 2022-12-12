const prefix = process.env.prefix;
const { Client, Message, MessageEmbed, Invite, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require("node-fetch");
const language = require('../../utils/language')


module.exports = {
    name: "puttparty",
    category: "fun",
    //aliases: ["yttogether", "ytt", "watchtogether", "wt", "together", "yt", "youtube"],
    //description: "Generate a youtube link to watch youtube together (through discord)",
    usage: `${prefix}puttparty`,
    //timeout: 1000,
    emoji: "🏓",

    run: async (client, message, args) => {
        const channel = message.member.voice.channel
        const { guild } = message

        if (!channel) {
            let embed = new MessageEmbed()
                    .setDescription(`${language(guild, 'VOICE_NEED_ACTIVITY')}`)
                    .setColor("#ff0000")
            
            message.channel.send({embeds: [embed]})    
            return
        }
        else {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "763133495793942528",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) {
                let embed = new MessageEmbed()
                .setDescription(`${language(guild, "PUTTPARTY_CANT_START")}`)
                .setColor("#ff0000")
                return message.channel.send(
                    {embeds: [embed]}
                )
            }
            let embed = new MessageEmbed()
            .setDescription(`${language(guild, "NOT_PHONE")}`)
            // [Click This Link To Start a YouTube Together Session](https://discord.com/invite/${invite.code})
            

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Click here')
                .setURL(`https://discord.com/invite/${invite.code}`)
                .setStyle('LINK')
            );
            message.channel.send({embeds: [embed], components: [row]})
        })
        }
    },
};
