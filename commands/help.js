module.exports = {
  name: 'help',
  category: 'General',
  commands: ['h'], // Optional
  // aliases: ['p'], // Optional
  // guildOnly: true,
  ownerOnly: false,
  minArgs: 0,
  maxArgs: -1,
  expectedArgs: '',
  // cooldown: '10s',
  callback: async ({ message, args, text, client, prefix, instance}) => {
    const { guild } = message
    const tag = message.author.tag
    const Discord = require('discord.js');
    if (!args.length) {
    const embed = new Discord.MessageEmbed();
      embed.setColor("RANDOM");
      embed.setDescription('<a:VC_loading:748831047579598888> Pinging...');
      embed.setFooter(instance.messageHandler.get(guild, 'FOOTER', {messageauthortag: tag}), message.author.avatarURL());
      embed.setTimestamp();
      message.channel.send(embed)
    }
    instance.commandHandler.commands.forEach((command) => {
      console.log(command.category)
    })

  }
}