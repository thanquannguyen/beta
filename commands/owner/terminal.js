const { Client, Message, MessageEmbed } = require("discord.js");
const child = require("child_process");
const language = require('../../utils/language')

module.exports = {
  name: "terminal",
  description: "Run terminal in discord!",
  usage: `${process.env.prefix}terminal <input>`,
  emoji: "💻",
  category: "owner",


  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const { guild } = message

    if (message.author.id != "180690270981980161") {
      message.react('❌')
      message.reply(`${language(guild, 'OWNER')}`).then(msg => {
        setTimeout(() => {
        // const deleteEmbed = new Discord.MessageEmbed();
        msg.delete(message);
        }, 5000);
      });
      return;
    };

    const command = args.join(" ");
    const embed = new MessageEmbed()
      .setDescription("please give a command to run in terminal!")
      .setColor("#303136");
    if (!command) return message.channel.send({ embeds: [embed] });

    child.exec(command, (err, res) => {
      if (err) return console.log(err);
      message.channel.send("```js\n" + res.slice(0, 2000) + "\n```", {
        code: "js",
      });
    });
  },
};
