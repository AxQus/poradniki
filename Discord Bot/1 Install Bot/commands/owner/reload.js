module.exports = {
    name: 'reload',
    category: 'Dev',
    aliases: ['restart', 'rl'],
    cooldown: 0,
    usage: `reload <category> <command>`,
    description: 'Wczytuje ponownie polecenie',
    run: async (client, message, args, user, text, prefix) => {
        if(message.author.id !== '526162682668253184') return message.channel.send('Nie jesteś Władcą!');//Add your id there so that only you can run this command.
        if(!args[0]) return message.channel.send('Musisz podać kategorię polecenia');
        if(!args[1]) return message.channel.send('Musisz podać nazwę polecenia!');

        let category = args[0];
        let command = args[1].toLowerCase();
        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)]//Change the path depending on how are your folders located.
            client.commands.delete(command);
            const pull = require(`../../commands/${category}/${command}.js`);
            client.commands.set(command, pull);

            return message.channel.send(`**${command}** został przeładowany pomyślnie!`);
        } catch (error) {
            return message.channel.send(`Wystąpił błąd podczas próby przeładowania **${command}**: \`${error.message}\``);
        }
    }
}