const { Client, Message, MessageEmbed } = require("discord.js");
const prefix = process.env.prefix;
const language = require('../../utils/language')


module.exports = {
  name: "eval",
  description: "Evaluate code",
  usage: `${prefix}eval <code>`,
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
    let code = args.join(" ");
    if (!code) {
      return message.channel.send({
        content: "Vui lòng cung cấp code.",
      });
    }
    let e;
    try {
      e = eval(code);
    } catch (err) {
      e = err;
    }
    const embed = new MessageEmbed()
      .setTitle("Evaluated Code")
      .setColor("#303136")
      .addField("Input", "```js\n" + code + "\n```")
      .addField("Output", "```js\n" + e + "\n```");
    message.channel.send({ embeds: [embed] });
  },
};
