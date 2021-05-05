const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

//Prefix bota - nie ma polecenia dodanego
const prefix = (config.prefix);

//Sygnalizuje że jest online
client.on('ready', () => {
  console.log(`Zalogowany ${client.user.tag}!`);
});

//Odpowiada na polecenie (ping)
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

//Loguje się do bota
client.login(config.token);