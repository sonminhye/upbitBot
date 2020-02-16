const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;
// read the doc from https://github.com/yagop/node-telegram-bot-api to know how to catch the chatId
//const chatId = process.env.TELEGRAM_CHAT_ID;
const channel_id = process.env.TELEGRAM_CHANNEL_ID;
// push 형식의 bot 생성
const bot = new TelegramBot(token, { polling: false });

// 방 사용자들에게 push
const telegrambot = (message, json) => {
  try {
      bot.sendMessage(channel_id, message);
      //'\n\n<pre>' + JSON.stringify(json, null, 2) + '</pre>'
      //var channel_id = bot.sendMessage(chatId, message, {
      //parse_mode: 'html'
    //});
  } catch (err) {
    console.log('Something went wrong when trying to send a Telegram notification', err);
  }
}

const ACTIONS = {
  NEW_USER: '🙋‍♂️new user',
  NEW_MONITOR: '🖥 new monitor',
  LATENCY: '👨‍💻 somebody has used the latency tool',
  NEW_STATUS_PAGE: '📈 new status page',
  NEW_SUBSCRIPTION: '💰💰💰 a user has subscribed!',
  NEW_PAYMENT: '🤑 a payment has processed',
  WEEKLY_REPORTS_SENDING: '✴️ Weekly reports are being sent',
  WEEKLY_REPORTS_SENT: '✅ Weekly reports have been sent',
  END_TRIAL_USERS: '✋ end of trial users today',
  TRIAL_USERS_SOON_END: '👀 users that end their trials in 3 days',
  START: '서버가동 모니터링 시작합니다.'
}

module.exports = {
  telegrambot,
  ACTIONS
}
