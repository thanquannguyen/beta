module.exports = {
  name: 'ping',
  category: 'General',
  commands: ['runping'], // Optional
  // aliases: ['p'], // Optional
  guildOnly: true,
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '10s',
  callback: ({ message, args, text, client, prefix, instance }) => {
     const { guild } = message
     const tag = message.author.tag
     const Discord = require('discord.js');
     const embed = new Discord.MessageEmbed();
        embed.setColor("RANDOM");
        embed.setDescription('<a:VC_loading:748831047579598888> Pinging...');
        embed.setFooter(instance.messageHandler.get(guild, 'FOOTER', {messageauthortag: tag}), message.author.avatarURL());
        embed.setTimestamp();
        message.channel.send(embed).then(msg => {
          setTimeout(() => {
          const editembed = new Discord.MessageEmbed();
          editembed.setDescription(`<a:VC_dot:714535064788009083> Pong! ${msg.createdTimestamp - message.createdTimestamp}ms.`);
          editembed.setFooter(instance.messageHandler.get(guild, 'FOOTER', {messageauthortag: tag}), message.author.avatarURL());
          editembed.setTimestamp();
          msg.edit(editembed);
          }, 2000);
        });
  }
}

module.exports.config = {
  displayName: 'Ping', // Can be changed any time
  dbName: 'VNC', // Should be unique and NEVER be changed once set
  loadDBFirst: true, // Wait for the database connection to be present
}