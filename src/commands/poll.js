const Discord = require('Discord.js');
const request = require('request'); // todo figure out why this doesnt work...
const strawPollUrl = 'https://strawpoll.me/api/v2/polls'; // url to create poll
const pollBaseUrl = 'http://strawpoll.me';// base url of created poll

exports.run = (client, message, args, logger) => {
  message.delete();
  message.channel.send('Beep boop... Creating your poll!')
    .then(message => {
      message.delete(5 * 1000) //5 second auto delete the bot's message
    })
    .catch(logger.error((err) => {logger.error(err)}));

  // grab title and remove it if it was provided
  let title = '';
  let postJson = new Object();
  if(args[0].startsWith('title=')){
    title = args[0].substring(6, args.indexOf(/[ \t]/));
    args.shift();
    postJson.title = title;
  }
  postJson.options = args;

  request.post(
    strawPollUrl,
    { json: postJson },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        logger.info(body);
        // TODO - parse the response and serve up a rich embedded message to the channel
        // response.done((data) => {
        //   let pollId = data.id;
        //   const embed = new Discord.RichEmbed();
        //   embed.setTitle(title).setAuthor(message.author.name, message.author.icon_url, message.author.url);
        //   embed.setURL(pollBaseUrl + '/' + pollId);
        //   embed.setTimestamp();
        //   message.channel.send({embed});
        // });
      } else {
        logger.error(error);
      }
    }
  );
};

exports.help = {
  name : 'poll',
  usage: 'poll title=[title] [option]...',
  description : 'Creates a simple poll of 2 to 30 options.'
                + ' Those options must be space separated, if you want multi-word options please use dashes.'
                + ' The title argument is optional but must be prepended with \'title=\''
};