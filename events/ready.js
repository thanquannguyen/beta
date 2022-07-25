const client = require("../index");
const chalk = require("chalk");
const mongo = require('../utils/mongo')
const { createStream, table } = require('table');
const tableConfig = require('../utils/tableConfig');
const { commandStatus, eventStatus } = require('../utils/registry');
const { loadLanguages } = require('../utils/language')


client.on("ready", async () => {
  // loadLanguages(client)
  // await loadTable(commandStatus, 50);
  // console.log("\n");
  // await loadTable(eventStatus, 50);
  // console.log("\n");
  
  // console.log(table(commandStatus))
  client.user.setActivity(`BETA`);
  console.log(
    chalk.cyanBright(`✅ Successfully logged on as ${client.user.username}#${client.user.discriminator}`)
  );
  await mongo().then(async (mongoose) => {
    try {
      await console.log(
        chalk.cyanBright(`✅ MongoDB connected`)
      )
    } finally {
      mongoose.connection.close()
    }
  })
});

function loadTable(arr, interval) {
  let fn, i = 0, stream = createStream(tableConfig);
  return new Promise((resolve, reject) => {
      fn = setInterval(() => {
          if(i === arr.length)
          {
              clearInterval(fn);
              resolve();
          }
          else {
              stream.write(arr[i]);
              i++;
          }
      }, interval); 
  })
}
