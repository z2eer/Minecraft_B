const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = '8999776759:AAHat7K5X9NwWJZFN1jryOdMN3ew4-eFld4';
const bot = new TelegramBot(token, { polling: true });

// رسالة البداية مع أزرار التحكم
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🟢 معلومات السيرفر', callback_data: 'status' }
        ],
        [
          { text: '🔗 رابط الدخول', callback_data: 'info' }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "أهلاً بك في بوت إدارة سيرفر ماينكرافت Aternos!\nاختر ما تحتاجه أدناه:", keyboard);
});

// التعامل مع الضغط على الأزرار
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'status') {
    bot.sendMessage(chatId, "📌 عنوان السيرفر:\n`Me204.aternos.me`\nالبورت: `19132`\nالنظام: `Bedrock (هواتف)`\n\nيُرجى تشغيل السيرفر من موقع Aternos مباشرة ثم الدخول عبر العنوان أعلاه.");
  } else if (data === 'info') {
    bot.sendMessage(chatId, "🔗 رابط السيرفر العام:\nadd.aternos.org/Me204");
  }

  bot.answerCallbackQuery(query.id);
});

