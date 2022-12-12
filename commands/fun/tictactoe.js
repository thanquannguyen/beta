const simplydjs = require('simply-djs')

module.exports={
    name:"tictactoe",
    aliases:["ttt"],
    category:"fun",
    usage:"tictactoe",
    timeout:"5000", //20 seconds
    run: async(client, message, args)=>{
      simplydjs.tictactoe(message, {
        embedColor:"RANDOM",
        credit: false,
      })
    }
  }