const language = require('../../utils/language')
const prefix = process.env.prefix;
const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = {
    name: "banner",
    category: "info",
    description: "Get user's banner.",
    usage: `${prefix}banner <user>`,
    timeout: 10000,
    emoji: "🏓",

    run: async (client, message, args) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(err => undefined);
        if (!user) user = message.author
        
        // axios.get(`https://cryptons.ga/api/v1/userbanner?id=${user.id}`)
        //     .then(function(response) {
        //         if(response.data.url === "null") return message.reply({ content: 'User doesnt have a banner' })
        //         const embed = new MessageEmbed()
        //             .setTitle(`Banner`)
        //             .setImage(response.data.url)
        //             .setColor('RANDOM')
        //         message.channel.send({ embeds: [embed]} );
        //     });

        // const data = await axios.get(`https://discord.com/api/users/${user.id}`, {
        //     headers: {
        //         Authorization: `Bot ${client.token}`
        //     }
        // }).then(d => d.data);
        // if(data.banner){
        //     let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        //     url = `https://cdn.discordapp.com/banners/${user.id}/${data.banner}${url}`;
        //     message.channel.send(`**Banner of ${user.tag}**:\n> ${url}`)
        // } else {
        //     message.channel.send(`:x: **User ${user.tag} has no Banner**`)
        // }
        
        user = await user.fetch()
        if (user.banner) {
            message.channel.send({
                embeds: [
                new MessageEmbed()
                    .setImage(user.bannerURL({ size: 4096, dynamic: true }))
                    .setTitle(`Banner ${user.tag}`),
                ],
            });
        } else {
            message.channel.send({
                embeds: [
                new MessageEmbed()
                    .setTitle(`${user.tag} got no banner.`),
                ],
            });
        }
    },
};
