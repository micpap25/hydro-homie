const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add some data to Hydro Homie")
    .addIntegerOption((option) =>
      option
        .setName("quota")
        .setDescription("Your daily water quota in fl. oz. (max. 200)")
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
    var quota = interaction.options.getInteger("quota");
    var time = interaction.options.getInteger("time");
    var pings = interaction.options.getBoolean("pings");

    if (quota > 200) {
      return interaction.reply({
        content: `Your daily quota of ${quota} fl. oz. may lead to water intoxication. Please select an amount less than or equal to 200 fl. oz., which is more than enough water for a day.`,
        ephemeral: true,
      });
    }
    if (time < 0 || time > 23){
      return interaction.reply({
        content: `Your time of ${time} is not a valid check-in time. Please select an hour, in 24-hour time, for this option.`,
        ephemeral: true,
      });
    }

    try {
      // const user = await users.create({
      //   username: interaction.user.username,
      //   time: time,
      //   quota: Sequelize.INTEGER,
      //   ping: Sequelize.SMALLINT
      // });

      return interaction.reply(`User ${interaction.user.username} NOT added because I haven't done this yet.`);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return interaction.reply({
          content: "You're already added to Hydro Homie.",
          ephemeral: true,
        });
      }

      return interaction.reply({
        content: "Something went wrong with adding you to Hydro Homie!",
        ephemeral: true,
      });
    }
  },
};
