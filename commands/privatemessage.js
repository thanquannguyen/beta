module.exports = {
  name: 'privatemessage',
  category: 'General',
  commands: ['pm'], // Optional
  // aliases: ['p'], // Optional
  // guildOnly: true,
  ownerOnly: true,
  minArgs: 0,
  maxArgs: -1,
  expectedArgs: '<user ID> <content>',
  // cooldown: '10s',
  callback: ({ message, args, text, client, prefix, instance }) => {
     const { guild } = message
     const tag = message.author.tag
     const Discord = require('discord.js');
      const embed = new Discord.MessageEmbed();
      let dms = args.slice(1).join(' ')
      embed.setColor("RANDOM");
      embed.setDescription('<a:VC_loading:748831047579598888> Sent...');
      embed.setFooter(instance.messageHandler.get(guild, 'FOOTER', {messageauthortag: tag}), message.author.avatarURL());
      embed.setTimestamp();
      message.channel.send(embed).then(msg => {
          setTimeout(() => {
          msg.delete(embed);
          }, 2000);
      });
      client.users.fetch(args[0]).then((user) => {
      user.send(dms);
  })
    
    

  }
}

module.exports.config = {
  displayName: 'Private Message', // Can be changed any time
  dbName: 'VNC', // Should be unique and NEVER be changed once set
  loadDBFirst: true, // Wait for the database connection to be present
}