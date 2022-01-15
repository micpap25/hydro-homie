const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("repeat")
        .setDescription("Say pong multiple times")
        .addIntegerOption((option) =>
          option
            .setName("pongs")
            .setDescription("The number of pongs (max 10)")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() == "repeat") {
      var str = "";
      var count = interaction.options.getInteger("pongs");
	  if (count > 10) count = 10;
      for (var i = 0; i < count; i++) {
        str += "Pong! ";
      }
      await interaction.reply(str);
    } else {
      await interaction.reply("Pong!");
    }
  },
};
