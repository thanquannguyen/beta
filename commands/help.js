module.exports = {
  testOnly: true, // Will now only work on test servers
  callback: ({ message, args, text, client, prefix, instance }) => {
    instance.commandHandler.commands.forEach((command) => {
      console.log(command)
    })
  }
}

module.exports.config = {
  displayName: 'Help', // Can be changed any time
  dbName: 'VNC', // Should be unique and NEVER be changed once set
  loadDBFirst: true, // Wait for the database connection to be present
}