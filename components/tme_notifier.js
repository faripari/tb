const TelegramBot = require('node-telegram-bot-api');4

const notification = (res) => {

    const TOKEN = '749116727:AAHSyq91mnxBaPNVzZrIP1D_nR_H59rBQZA';
  
    const bot = new TelegramBot(TOKEN, {
      polling: true
    })
    const chat_id = '219450393';


    bot.sendMessage(chat_id, res)
}

module.exports = notification;