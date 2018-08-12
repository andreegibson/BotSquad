module.exports.run = (client, message, args, logger) => {
  // default the number of seconds to auto delete to 5
  if(isNaN(args[0])) {
    message.delete().catch(logger.error((err) => {logger.error(err)}));
    message.channel.send('The [' + this.help.name + '] command did not have a valid format.\nUsage: ' + this.help.usage)
      .then(message => {
        // auto delete message after 10s
        message.delete(10 * 1000)
      })
      .catch(logger.error((err) => {logger.error(err)}));
    return;
  }
  logger.debug('deleting user [' + message.author + ']\'s message with id [' + message.id + '] in [' + args[0] + '] seconds');
  message.delete(args[0] * 1000).catch((err) => {logger.error(err)});
};

exports.help = {
  name : 'delete',
  usage : 'delete || delete [seconds]',
  description : 'Auto deletes the message'
};