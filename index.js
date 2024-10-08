import dotenv from 'dotenv';
dotenv.config();

import { ButtonStyle, Client, GatewayIntentBits } from 'discord.js';
import { ButtonBuilder, ActionRowBuilder } from 'discord.js';
import { invoke } from './ai.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const btn = new ButtonBuilder()
  .setCustomId('translate')
  .setLabel('Translate me to 🇰🇷')
  .setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(btn);

client.login(process.env.DISCORD_TOKEN);
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const text = await invoke(message.content);
  message.reply({ content: text, components: [row] });
});

client.on('interactionCreate', async (interaction) => {
  console.log(interaction);
  if (!interaction.isButton()) return;

  if (interaction.customId === 'translate') {
    const text = await invoke(
      'Translate the previous message to Korean. Do not addplanation ex'
    );
    interaction.reply({ content: text, ephemeral: true });
  }
});
