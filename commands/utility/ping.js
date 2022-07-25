const { MessageEmbed } = require("discord.js");
const prefix = process.env.prefix;

module.exports = {
  name: "ping",
  aliases: ['p', 'pg'],
  category: "info",
  description: "Get bot's real time ping status.",
  usage: `${prefix}ping`,
  userPermissions: ['',''],
  // timeout: 10000,
  emoji: "🏓",

  run: async (client, message, args) => {
    const embedwaiting = new MessageEmbed()
    .setTitle("Pinging, please wait...")

    message.channel.send({embeds: [embedwaiting]}).then(msg => {
      const embed = new MessageEmbed()
      .setColor("#303136")
      .setTitle("🏓 Ping pong!")
      // .setDescription(`PING: ${client.ws.ping} ${await client.translate('this is a test', message)}`);
      .setDescription(`PING: ${client.ws.ping}`);
      setTimeout(() => {
        msg.edit({embeds: [embed]})
      }, 2000);
    })    
  },
};
