exports.run = (client, message, args, logger) => {
  // if help isn't called for a specific command then display a basic command listing
  if(!args[0]) {
    const commands = client.commands;
    let output = '';
    commands.forEach(command => {
      output += 'Command: ' + command.help.name + '\t\t\t Usage: ' + command.help.usage + '\n';
    });
    message.channel.send(output).catch(console.error);
  }

  // TODO - individualized help text, based on arg[0] that also shows the description

  message.delete();
};

exports.help = {
  name : 'help',
  usage: 'help || help [command]',
  description : 'Displays all available commands. If called with a command name shows the help test for that command'
};