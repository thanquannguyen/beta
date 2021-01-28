module.exports = (client, instance) => {
  client.on('message', (message) => {
    console.log(message.content)
  })
}