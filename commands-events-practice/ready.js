module.exports = {
  name: "ready",
  once: true,
  execute(interaction, users) {
    console.log(`Ready! Logged in as ${interaction.user.tag}`);
    users.sync();
  },
};
