const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  execute(client) {
    // eslint-disable-next-line no-console
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
