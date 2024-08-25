
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const {commands}  = require('./blocks/comands');
const {quotes}  = require('./blocks/quotes');

const {start}  = require('./functions/start');
const {getCategories}  = require('./functions/getCategories');
const {checkUserExist}  = require('./functions/checkUserExist');





const API_KEY_BOT = '6738232005:AAEIQJsUxGAnCieXZeszbdOtpVmMlHQ40QM';

const bot = new TelegramBot(API_KEY_BOT, {
    polling: {
      interval: 300,
      autoStart: true
    }
  });
const app = express();
const PORT = process.env.PORT || 3002;
// Массив, чтобы отслеживать использованные цитаты
let curDeadline;
// Обработчик GET-запроса
// app.get('/api/status/:status/:chatId', (req, res) => {
//   const status = req.params.status;
//   const chatId = req.params.chatId;

//   console.log(`Статус: ${status}, Chat ID: ${chatId}`);
  
//   res.send({ status: 'Бот работает', receivedStatus: status, receivedChatId: chatId });
// });
let isCreatingGoal = false;
let progressinfoId;
//обработка ошибки
bot.on("polling_error", err => console.log(err.data.error.message));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
bot.setMyCommands(commands);

async function getUserGoals(userId) {
    try {
      const response = await fetch(`http://localhost:3000/usergoal/${userId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Ошибка при получении целей пользователя');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      return [];
    }
  }

start(bot, app);
    //закрытие меню
    const categories = ['category1', 'category2', 'category3']; // Example categories

    bot.on('callback_query', async ctx => {
      try {
          console.log('Callback data:', ctx.data); // Debugging line to see what data is received
  
          switch (ctx.data) {
              case "closeMenu":
                  await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                  break;
              case "createGoal":
                  getUserGoals(ctx.message.chat.id).then(async date => {
                      const userGoals = date;
                      const activeGoal = userGoals.find(goal => goal.status === 'active' || goal.status === 'inProgress');
                      if (activeGoal) {
                          console.log(activeGoal);
                          await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                          await bot.sendMessage(ctx.message.chat.id, `У вас уже есть активная цель. Пожалуйста, завершите её перед созданием новой.`);
                      } else {
                          await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                          await bot.sendMessage(ctx.message.chat.id, "Отлично! Теперь выбери категорию своей цели👈");
                          getCategories(bot, ctx.message.chat.id);
                          console.log('он сюда зашел');
                      }
                  });
                  break;
              case "showGoals":
                  getUserGoals(ctx.message.chat.id).then(async data => {
                      const userGoals = data;
                      await bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                      const goalsText = userGoals.map((goal, index) => `${index + 1}) Цель: ${goal.goal}, статус: ${goal.status}`).join('\n');
                      await bot.sendMessage(ctx.message.chat.id, `Ваши цели:\n${goalsText}`);
                  });
                  break;
              default:
                  const categoryId = ctx.data; // Assuming callback_data is category ID
                  const chatId = ctx.message.chat.id;
  
                  // Handle category selection
                  console.log('Category ID selected:', categoryId); // Debugging line to see which category was selected
                  bot.sendMessage(chatId, `Вы выбрали категорию с ID: ${categoryId}`)
                      .then(() => {
                          checkUserExist(bot, chatId, ctx.message.chat.first_name, categoryId, app);
                          bot.deleteMessage(chatId, ctx.message.message_id)
                              .catch(error => console.error('Ошибка при удалении сообщения:', error));
                      })
                      .catch(error => console.error('Ошибка при отправке сообщения:', error));
                  break;
          }
      } catch (error) {
          console.log(error);
      }
  });
