/* eslint-disable no-console */
const { Client, GatewayIntentBits, Partials } = require("discord.js");

require("dotenv").config();

const { DiscordToken } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
  ], // eslint-disable-line max-len
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(DiscordToken);
