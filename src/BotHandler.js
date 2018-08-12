logger = require('winston');
auth = require('../auth.json')

// configure logger
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {colorize : true});
logger.level = 'debug';

module.exports.handle = (msg, bot) => {
  // get the command from the message to the bot and remove command from args
  const args = msg.content.slice(auth.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  logger.debug('args == ' + args)

  logger.debug('Received command [' + cmd + ']')

  switch(cmd) {
    case 'info':
      msg.channel.send('Welcome to the BotSquad ' + msg.author + '!');
      msg.delete();
      break;
    case 'delete':
      logger.debug('deleting message in [' + args[0] + '] seconds');
      msg.delete(args[0] * 1000);
      break;
    default:
      msg.channel.send('Beep boop... I don\'t understand the command [' + cmd + '].');
      msg.delete();
      break;
  }
};