const http = require("http");
/* eslint-disable no-console */
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const path = require("path");
const fs = require("fs");

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

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

eventFiles.forEach((file) => {
  const filePath = path.join(eventsPath, file);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const event = require(filePath);

  client.on(event.name, (...args) => event.execute(...args, client));
});

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, () => {
  console.log(`Server running at port: ${port}/`);
});

client.login(DiscordToken);
