module.exports = (client, logger, message) => {

  // ignore all bots
  if (message.author.bot) return;

  // ignore messages not starting with the prefix (in config.json)
  if (message.content.substring(0,1) !== client.prefix) return;

  // our standard argument/command name definition.
  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  // grab the command data from the client.commands Enmap
  const cmd = client.commands.get(commandName);

  // if that command doesn't exist, silently exit and do nothing
  if (!cmd) {
    message.channel.send('Beep boop... I don\'t understand the command [' + commandName + ']')
      .then(message => {
        // auto delete message after 10s
        message.delete(10 * 1000)
      })
      .catch(logger.error('Error sending message [' + message.content + '] to channel [' + message.channel + ']'));
    message.delete();
    return;
  }

  // run the command
  cmd.run(client, message, args, logger);
};