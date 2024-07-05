
const { response } = require('express');
const TelegramBot = require('node-telegram-bot-api');
const {commands}  = require('./blocks');
const {quotes}  = require('./quotes');
const {start}  = require('./functions');




const API_KEY_BOT = '6738232005:AAEIQJsUxGAnCieXZeszbdOtpVmMlHQ40QM';

const bot = new TelegramBot(API_KEY_BOT, {
    polling: {
      interval: 300,
      autoStart: true
    }
  });
  
// Массив, чтобы отслеживать использованные цитаты
let curDeadline;
let usedQuotes = [];
let isCreatingGoal = false;
let progressinfoId;
//обработка ошибки
bot.on("polling_error", err => console.log(err.data.error.message));


bot.setMyCommands(commands);


start();
    //закрытие меню
    bot.on('callback_query', async ctx => {
        try {
            switch(ctx.data) {
                case "closeMenu":
                    await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                    break;
                case "createGoal":
                    await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                    await bot.sendMessage(ctx.message.chat.id, "Отлично! Теперь выбери категорию своей цели👈");
                    getCategories(ctx.message.chat.id);
                    break;
                default:
                    const category = ctx.data; // Получаем выбранную категорию
                    const chatId = ctx.message.chat.id;
    
                    // Отправляем сообщение с выбранной категорией пользователю
                    bot.sendMessage(chatId, `Вы выбрали категорию: ${category}`)
                        .then(() => {
                            // Удаляем сообщение с кнопками категорий
                            checkUserExist(chatId, ctx.message.chat.first_name,category);
                            bot.deleteMessage(chatId, ctx.message.message_id)
                                .catch(error => console.error('Ошибка при удалении сообщения:', error));
                        })
                        .catch(error => console.error('Ошибка при отправке сообщения:', error));
                    break;
            }
        }
        catch(error) {
            console.log(error);
        }
    });