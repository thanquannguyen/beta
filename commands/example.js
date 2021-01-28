module.exports = {
  callback: ({ message, args, text, client, prefix, instance }) => {
    const { guild } = message
    message.reply(instance.messageHandler.get(guild, 'EXAMPLE'))
  },
}