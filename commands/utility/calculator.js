const simplydjs = require('simply-djs')

module.exports={
    name:"calculator",
    aliases:["calc"],
    category:"Utility",
    usage:"calc",
    timeout:"5000",
    run: async(client, message, args)=>{
      simplydjs.calculator(message, {
        embedColor:"RANDOM",
        credit: false,
      })
    }
  }