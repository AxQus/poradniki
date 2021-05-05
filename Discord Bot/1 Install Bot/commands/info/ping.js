const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  aliases: [],
  description: 'Daje ping bota i API.',
    run : async(client, message, args) => {
            const messagePing = Date.now(); 
            const msg = await message.channel.send(`Sprawdzanie...`)
            const endMessagePing = Date.now() - messagePing; 



        const embed = new MessageEmbed()
            .setTitle('Czas reakcji to!')
            .setDescription(`
               WebSocket ping: \`${client.ws.ping}ms\`
               Message ping: \`${endMessagePing}ms\`
             `)

            .setColor('GREEN')
            .setTimestamp();

            await message.channel.send(embed)
            msg.delete()

    }
}

//-------------------------------------------------

// const { MessageEmbed } = require('discord.js')
// module.exports = {
//     name : 'ping',
//     category : 'info',
//     description : 'Returns latency and API ping',

//     /**
//      * @param {Client} client
//      * @param {Message} message
//      * @param {String[]} args
//      */

//     run : async(client, message, args) => {
//         const msg = await message.channel.send(`Sprawdzanie...`)
//         const embed = new MessageEmbed()
//             .setTitle('Czas reakcji to!')
//             .setDescription(`WebSocket: ${client.ws.ping}MS\nMessage edit: ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
//             await message.channel.send(embed)
//             msg.delete()

//     }
// }

//-------------------------------------------------

// // @ts-check // Can be removed, used to check typings and valid actions
// const { MessageEmbed } = require('discord.js');
// const quick = require('quick.db');

// module.exports = {
//   name: 'ping',
//   aliases: [],
//   description: 'Get bot ping.',
//   async execute(client, message) {
//     const ping = await getDBPingData();
//     const messagePing = Date.now(); // start before message sent
//     const msg = await message.channel.send('Loading...');
//     const endMessagePing = Date.now() - messagePing; // end of message sent

//     const embed = new MessageEmbed() // build message embed
//       .setDescription(
//         `
//         Database ping data:
//         - Fetch ping: \`${ping.endGet}ms\`
//         - Wright ping: \`${ping.endWright}ms\`
//         - Avrage ping: \`${ping.avarage}ms\`
//         Message ping: \`${endMessagePing}ms\`
//       `
//       )
//       .setColor('GREEN')
//       .setTimestamp();

//     msg.edit({
//       content: '',
//       embed,
//     }); // edit message content
//   },
// };

// async function getDBPingData() {
//   // get the fetch data ping
//   const startGet = Date.now();
//   await quick.get('QR=.');
//   const endGet = Date.now() - startGet;

//   // get the wright data ping
//   const startWright = Date.now();
//   await quick.set('QR=.', Buffer.from(startWright.toString()).toString('base64'));
//   const endWright = Date.now() - startWright;

//   // avrage ping time
//   const avarage = (endGet + endWright) / 2;
//   try {
//     quick.delete('QR=.'); // try deleteing
//   } catch (error) {}
//   return { endGet, endWright, avarage }; // return the ping data
// }