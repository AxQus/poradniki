const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

//Tutaj są ważne pliki np.: token
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

//Command Handlers
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

//Event Handlers
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//Loguje się do bota
client.login(config.token);