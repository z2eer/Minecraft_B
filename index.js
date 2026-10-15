const TelegramBot = require('node-telegram-bot-api');
const mineflayer = require('mineflayer');

const token = '8999776759:AAHat7K5X9NwWJZFN1jry0dMN3ew4-eFld4';
const bot = new TelegramBot(token, { polling: true });

let mcBot = null;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "أهلاً بك في بوت إدارة سيرفر ماينكرافت!\n/join - لدخول البوت وإبقاء السيرفر شغالاً\n/leave - لخروج البوت");
});

bot.onText(/\/join/, (msg) => {
  const chatId = msg.chat.id;
  
  if (mcBot) {
    bot.sendMessage(chatId, "البوت موجود داخل السيرفر بالفعل!");
    return;
  }

  bot.sendMessage(chatId, "جاري إدخال البوت إلى سيرفر Aternos...");

  mcBot = mineflayer.createBot({
    host: 'Me204.aternos.me',
    port: 19132,
    username: 'AternosGuard'
  });

  mcBot.on('spawn', () => {
    bot.sendMessage(chatId, "✅ تم دخول البوت بنجاح وبقي السيرفر مفتوحاً!");
    
    // حركة القفز لمنع الطرد بسبب الخمول (AFK) كل دقيقة
    setInterval(() => {
      if (mcBot) {
        mcBot.setControlState('jump', true);
        setTimeout(() => mcBot.setControlState('jump', false), 500);
      }
    }, 60000);
  });

  mcBot.on('end', () => {
    bot.sendMessage(chatId, "⚠️ تم فصل البوت من السيرفر.");
    mcBot = null;
  });

  mcBot.on('error', (err) => {
    console.log(err);
    bot.sendMessage(chatId, "❌ حصل خطأ أثناء الاتصال بالسيرفر!");
  });
});

bot.onText(/\/leave/, (msg) => {
  const chatId = msg.chat.id;
  if (mcBot) {
    mcBot.quit();
    mcBot = null;
    bot.sendMessage(chatId, "🛑 تم إخراج البوت.");
  } else {
    bot.sendMessage(chatId, "البوت ليس داخل السيرفر أصلاً.");
  }
});
