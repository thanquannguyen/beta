const language = require('../../utils/language')
const prefix = process.env.prefix;

module.exports = {
  name: "add",
  category: "info",
  description: "Get bot's real time ping status.",
  usage: `${prefix}add`,
  timeout: 10000,
  emoji: "🏓",

  run: async (client, message, args) => {
    const { guild } = message
    message.reply(`${language(guild, 'THE_SUM_IS')} 5`)
  },
};
