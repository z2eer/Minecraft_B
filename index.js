const TelegramBot = require('node-telegram-bot-api');
const bedrock = require('bedrock-protocol');

const token = '8999776759:AAHat7K5X9NwWJZFN1jryOdMN3ew4-eFld4';
const bot = new TelegramBot(token, { polling: true });

let mcClient = null;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "أهلاً بك في بوت ماينكرافت Bedrock!\n\n/join - لدخول البوت إلى السيرفر\n/leave - لخروج البوت");
});

bot.onText(/\/join/, (msg) => {
  const chatId = msg.chat.id;
  
  if (mcClient) {
    bot.sendMessage(chatId, "البوت متصل بالفعل بالسيرفر!");
    return;
  }

  bot.sendMessage(chatId, "جاري إدخال البوت إلى سيرفر Bedrock...");

  mcClient = bedrock.createClient({
    host: 'Me204.aternos.me',
    port: 19132,
    username: 'AternosGuard',
    version: '1.26.52',
    offline: true
  });

  mcClient.on('spawn', () => {
    bot.sendMessage(chatId, "✅ تم دخول البوت بنجاح إلى سيرفر الهاتف (Bedrock)!");
  });

  mcClient.on('close', () => {
    bot.sendMessage(chatId, "⚠️ تم انقطاع اتصال البوت من السيرفر.");
    mcClient = null;
  });

  mcClient.on('error', (err) => {
    console.log(err);
    bot.sendMessage(chatId, `❌ حصل خطأ في الاتصال: ${err.message}`);
    mcClient = null;
  });
});

bot.onText(/\/leave/, (msg) => {
  const chatId = msg.chat.id;
  if (mcClient) {
    mcClient.close();
    mcClient = null;
    bot.sendMessage(chatId, "🛑 تم فصل البوت وإخراجه من السيرفر.");
  } else {
    bot.sendMessage(chatId, "البوت ليس داخل السيرفر أصلاً.");
  }
});
