const { Client, Message, MessageEmbed } = require("discord.js");
const glob = require("glob");
const { table } = require('table');
const { cmdStatus, evtStatus } = require('../../utils/registry');
const language = require('../../utils/language')
const {Util: {splitMessage},} = require("discord.js")
const split = splitMessage("")

module.exports = {
  name: "reload",
  usage: `${process.env.prefix}reload`,
  description: "Reload all commands at once",
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
    client.commands.sweep(() => true);
    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);
        if (pull.name) {
          client.commands.set(pull.name, pull);
        }
      });
    });
    // message.channel.send("```js\n" + table(cmdStatus) + "\n```")
    // message.channel.send("```js\n" + table(evtStatus) + "\n```")
    message.channel.send({ content: "Đã reload toàn bộ commands và events." });
  },
};


