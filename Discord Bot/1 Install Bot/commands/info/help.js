const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

const config = require('./config.json');
const prefix = (config.prefix);

module.exports = {
  name: "help",
  aliases : ['h', 'pomoc'],
  description: "Pokazuje wszystkie dostępne komendy bota.",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Brak nazwy.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "W trakcie realizacji." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Potrzebujesz pomocy? Oto wszystkie moje polecenia:")
        .addFields(categories)
        .setDescription(
          `Użyj \`${prefix}help\` po którym następuje nazwa polecenia, aby uzyskać więcej dodatkowych informacji o poleceniu. Na przykład: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Wnioskowane przez ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Nieprawidłowa komenda! Używam ${prefix}help do wszystkich moich poleceń.!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Szczegóły polecenia:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "KOMENDA:",
          command.name ? `\`${command.name}\`` : "Brak nazwy dla tego polecenia."
        )
        .addField(
          "ALIASY:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Brak aliasów dla tego polecenia."
        )
        .addField(
          "ZASTOSOWANIE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "OPIS:",
          command.description
            ? command.description
            : "Brak opisu dla tego polecenia."
        )
        .setFooter(
          `Wnioskowane przez ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
