module.exports = function(){
  
  const TelegramBot = require('node-telegram-bot-api');
  const upbitApi = require('./upbitApi.js');
  const token = process.env.TELEGRAM_TOKEN;
  const bot = new TelegramBot(token, {polling: true});

    bot.onText(/\/echo (.+)/, (msg, match) =>{
      const chatId = msg.chat.id;
      const resp = match[1];
      bot.sendMessage(chatId, resp);
    });

    // 사용자가 물어봤을 때 대답
    bot.on('message', async(msg) => {
      const chatId = msg.chat.id;
      var jsonObj = await upbitApi.getMarketInfo(msg.text);
      if(msg.text == '사랑해'){
        bot.sendMessage(chatId, '나도');
      }else if(msg.text == '중지'){
        // 모니터링 중지
        upbitApi.stopMonitor();
      }else if(msg.text == '다시시작'){
        // 모니터링 재시작
        upbitApi.startMonitor();
      }
      else{
        var resMsg = "";
        for(var i = 0 ; i < jsonObj.length; i++ ){
            resMsg += jsonObj[i].market + '\n';
            resMsg += '현재가 : ' + jsonObj[i].trade_price + '\n';
        }
        bot.sendMessage(chatId, resMsg);
      }
    });
}
