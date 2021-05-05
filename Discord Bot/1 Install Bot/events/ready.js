//Tutaj jest kod pliki np.: prefix
const config = require('./config.json');
const prefix = (config.prefix);

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const statusList = [
			        `${prefix}help - pomoc`,
			        `Jestem na ${client.guilds.cache.size} Serwerach.`,
			        `Obserwuję ${client.users.cache.size} Użytkowników.`,
					``
			    ];
			
			    setInterval(() =>{
			        const index = Math.floor(Math.random() * (statusList.length));
			        client.user.setActivity(statusList[index]);
			    }, 10000)
			    // client.user.setActivity(`${prefix}help`)
			    console.log(`${client.user.username} połączono!`);
				console.log(`Gotowy do pracy na ${client.guilds.cache.size} serwerach. Liczba ${client.users.cache.size} użytkowników.`);
	},
};