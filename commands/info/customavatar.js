const language = require('../../utils/language')
const prefix = process.env.prefix;
const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = {
    name: "customavatar",
    category: "info",
    description: "Get user's custom avatar.",
    usage: `${prefix}customavatar <user>`,
    timeout: 10000,
    emoji: "🏓",

    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined);
        if (!user) user = message.author
        let member = message.guild.members.cache.get(user.id);
        if(!member) await message.guild.members.fetch(user.id).catch(e=>{ }) || false;
        if(member){
            const data = await axios.get(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);
            if(data.avatar && data.avatar != user.avatar){
                let url = data.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
                url = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${user.id}/avatars/${data.avatar}${url}`;
                message.channel.send(`**CUSTOM AVATAR of ${user.tag}**:\n> ${url}`)
            } else {
                message.channel.send(":x: **User has no CUSTOM AVATAR**")
            }
        } else {
            message.channel.send(":x: **User has no CUSTOM AVATAR**")
        }
    },
};
