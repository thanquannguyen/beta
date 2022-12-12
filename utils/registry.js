const c = require('ansi-colors');
const fs = require('fs').promises;
const path = require('path');
const commandStatus = [
    [`${c.bold('Command')}`, `${c.bold('Status')}`]
], eventStatus = [
    [`${c.bold('Event')}`, `${c.bold('Status')}`]
];
const cmdStatus = [
    ['Command', 'Status']
], evtStatus = [
    ['Event', 'Status']
];

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    commandStatus.push(
                        [`${c.cyan(`${cmdName}`)}`, `${c.bgGreenBright('Success')}`]
                    )    
                    cmdStatus.push(
                        [`${cmdName}`, 'Success']
                    )  
                }
                catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`${c.white(`${cmdName}`)}`, `${c.bgRedBright('Failed')}`]
                    );
                    cmdStatus.push(
                        [`${cmdName}`, 'Failed']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    eventStatus.push(
                        [`${c.cyan(`${eventName}`)}`, `${c.bgGreenBright('Success')}`]
                    )
                    evtStatus.push(
                        [`${eventName}`, `Success`]
                    )
                }
                catch(err) {
                    console.log(err);
                    eventStatus.push(
                        [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Failed')}`]
                    );
                    evtStatus.push(
                        [`${eventName}`, `Failed`]
                    );
                }
            }
        }
    }
}

module.exports = { 
    commandStatus, 
    eventStatus, 
    cmdStatus, 
    evtStatus, 
    registerEvents, 
    registerCommands 
};