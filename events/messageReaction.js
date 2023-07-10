const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user, client) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Fetching message failed: ", error);
        return;
      }
    }

    if (user.bot) return;
    if (reaction.emoji.name === "🔖") {
      const { author, content, url } = reaction.message;
      user.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#0078d4")
            .setAuthor({
              name: author.username + author.discriminator,
              iconURL: author.displayAvatarURL(),
            })
            .setDescription(
              `
          ${content}
          
          [Original Message](${url})
          `
            )
            .setFooter({
              text: "React with ❌ to delete dev guild bot messages.",
            }),
        ],
      });
    }

    // handle DM message reactions
    // check if thereaction is from a server
    if (reaction.message.guild == null) {
      // ignore non bot messages
      if (reaction.message.author.id !== client.user.id) return;

      // delete message
      if (reaction.emoji.name === "❌") {
        reaction.message.delete();
      }
    }
  },
};
