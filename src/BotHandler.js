module.exports.handle = (msg, discordData) => {
  args = msg.substring(1).split(' ');

  // get the command from the message to the bot, remove from additional args
  //cmd = args.splice(1);

  switch(args[0]) {
    case 'info':
      discordData.bot.sendMessage({
        to: discordData.channelID,
        message: "Welcome to the BotSquad " + discordData.user + "!"
      });
      break;
  }
};