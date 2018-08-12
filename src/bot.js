Discord = require('discord.js');
logger = require('winston');
auth = require("../auth.json");
handler = require('./BotHandler.js');

// configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize : true});
logger.level = 'debug';

// initialize Discord bot
const botFlag = auth.prefix; // the flag for operating bot commands
bot = new Discord.Client();
bot.on('ready', (event) => {
  logger.info('Connected to channel... ' ); // TODO - figure out serverId/name and log it
  logger.info('Logged in as: ' + bot.username + '-(' + bot.id +')');
});
bot.on('message', (message) => {
  if(message.content.substring(0,1) === botFlag) {
    // handle the message
    handler.handle(message, bot);
  }
});

bot.login(auth.token);