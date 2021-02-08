module.exports = {
  callback: ({ message, args, text, client, prefix, instance }) => {
    instance.commandHandler.commands.forEach((command) => {
      console.log(command)
    })
  }
}