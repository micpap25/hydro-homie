const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add some data to Hydro Homie")
    .addIntegerOption((option) =>
      option
        .setName("quota")
        .setDescription("Your water quota in fl oz (max. 160)")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Your check-in time (pick an hour, 24-hour time)")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("pings")
        .setDescription(
          "Should Hydro Homie ping you to remind you of your water quota?"
        )
        .setRequired(true)
    ),
  async execute(interaction, users) {
    const username = interaction.user.tag;
  },
};
