const TelegramBot = require('node-telegram-bot-api');
const mineflayer = require('mineflayer');

const token = '8999776759:AAHat7K5X9NwWJZFN1jry0dMN3ew4-eFld4';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "البوت شغال وبخير!");
});
