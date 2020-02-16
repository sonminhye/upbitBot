const TelegramBot = require('node-telegram-bot-api');
const pushBot = require('./pushBot');
const pollBot = require('./pollBot');

module.exports = {
  pollBot : pollBot,
  pushBot: function() {
     // push 형식의 봇.
     pushBot.telegrambot(pushBot.ACTIONS.START, {data:'ddd'} );
  }
}
