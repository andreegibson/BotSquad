const Discord = require('discord.js');
const logger = require('winston');
const auth = require("../auth.json");
const Enmap = require("enmap");
const fs = require("fs");

// configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize : true});
logger.level = 'debug';

// initialize Discord bot
client = new Discord.Client();
client.prefix = auth.prefix; // the flag for operating bot commands

// this loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir('./src/events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client, logger));
  });
});
logger.debug('Events attached to the client/bot.');

// assign each command handler to the bot
client.commands = new Enmap();
fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.js')) {
      return;
    }
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    logger.info(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(auth.token);