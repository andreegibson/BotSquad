exports.run = (client, message, args, logger) => {
  // if coin flip is called with specific heads and tails options
  message.delete();
  if(args[0] && args[1]) {
    message.channel.send('Flipping a coin... Heads is [' + args[0] + '] and Tails is [' + args[1] + ']' + '\n'
      + (Math.random() >= 0.5 ? 'Heads it is! [' + args[0] + ']' : 'Tails it is! [' + args[1] + ']'));
  } else {
    message.channel.send('Flipping a coin...' + '\n'
      + (Math.random() >= 0.5 ? 'Heads it is!' : 'Tails it is!'));
  }
};

exports.help = {
  name : 'coin',
  usage: 'coin || coin [heads-option] [tails-option]',
  description : 'Randomly selects between two options. Those options must be \'-\' separated instead of space separated'
};