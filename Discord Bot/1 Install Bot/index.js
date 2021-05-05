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

//Executor commands
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.execute(client, message, args) 
})

//Loguje się do bota
client.login(config.token);