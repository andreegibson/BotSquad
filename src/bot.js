Discord = require('discord.io');
logger = require('winston');
auth = require("../auth.json");
handler = require('./BotHandler.js');

// configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize : true});
logger.level = 'debug';

// initialize Discord bot
botFlag = '!'; // the flag for operating bot commands
bot = new Discord.Client({
  token : auth.token,
  autorun : true
});
bot.on('ready', (event) => {
  logger.info('Connected to server...');
  logger.info('Logged in as: ' + bot.username + '-(' + bot.id +')');
});
bot.on('message', (user, userID, channelID, message, event) => {

  discordData = {
    "user" : user,
    "userID" : userID,
    "channelID" : channelID,
    "bot" : bot
  };
  if(message.substring(0,1) == botFlag) {
    handler.handle(message, discordData);
    logger.info('message handled');
  }
});