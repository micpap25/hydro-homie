// TODO: Add commands, give user role once registered, set up sqlite3 stuff
https://github.com/micpap25/doppler-effect
const fs = require("fs");
const Sequelize = require("sequelize");
const { Client, Collection, Intents } = require("discord.js");

const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "database.sqlite",
});

const users = sequelize.define('users', {
	username: Sequelize.STRING,
  quota: Sequelize.INTEGER,
  time: Sequelize.DATE,
  ping: Sequelize.SMALLINT
});

client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
  users.sync();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  
  console.log(
    `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
  );

  try {
    await command.execute(interaction, users);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
