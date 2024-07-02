const { response } = require('express');
const TelegramBot = require('node-telegram-bot-api');


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
const quotes = [
    "Не бойтесь трудностей, они являются лишь шансом стать сильнее.",
    "Секрет успеха — это начать делать то, чего другие боятся.",
    "Мечтайте большим, начинайте малым, но приступайте к действию.",
    "Только тот, кто рискнет, может добиться великих результатов.",
    "Помните, что каждый профессионал был когда-то новичком. Не останавливайтесь на своем пути к мастерству."
  ];


const commands = [

    {

        command: "start",
        description: "Запуск бота"

    },
    {

        command: "menu",
        description: "Меню"

    },
    {

        command: "goals",
        description: "Посмотреть список целей"

    },
    {

        command: "help",
        description: "Раздел помощи"

    },

]

bot.setMyCommands(commands);

function start(){
    bot.on('text', async msg => {
        try {
    
            if(msg.text == '/start') {
                
                await bot.sendMessage(msg.chat.id, `Бодрого денечка, человек👋 \nЯ помогу тебе ВОПЛОТИТЬ ЦЕЛИ в жизнь и доказать, что для тебя НЕТ НЕВОЗМОЖНОГО⚡ Твои успехи точно принесут свои плоды (P.S. сервис «ДВИГАЙ!» гарантирует😉`);
                await bot.sendMessage(msg.chat.id, `А еще мы поощряем целеустремленных, так что ДВИГАЙ!`);
                await bot.sendMessage(msg.chat.id, `Вот что я могу тебе предложить:`, {
    
                    reply_markup: {
            
                        inline_keyboard: [
            
                            [{text: '⚡️ ЕСТЬ ЦЕЛЬ', callback_data: 'createGoal'},{text: '⭐️ МОИ ЦЕЛИ', callback_data: 'showGoals'}],
                            [{text: 'Закрыть Меню', callback_data: 'closeMenu'}]
            
                        ]
            
                    }
            
                })
                
            }
            else if(msg.text == '/goals') {
    
                await bot.sendMessage(msg.chat.id, `Ваши цели список*`);
    
            }
            else if(msg.text == '/help' || msg.text == '👁‍🗨 Помощь') {
    
                await bot.sendMessage(msg.chat.id, `Если возникли технические проблемы свяжитесь  @VlaStrel*`);
    
            }
            else if(msg.text == '/menu') {
    
                await bot.sendMessage(msg.chat.id, `Меню бота`, {
            
                    reply_markup: {
            
                        keyboard: [
            
                            ['⚡️ ЕСТЬ ЦЕЛЬ', '⭐️ МОИ ЦЕЛИ'],
                            ['👁‍🗨 Помощь']
            
                        ]
            
                    }
            
                })
            
            }
            else if(msg.text == '/result') {
                downloadRes(msg.chat.id,1);
            }
            else if (msg.text == '/getMotivation') {
                getNewQuote(msg.chat.id);
            } 
            else if (msg.text=='/helpme') {
                needHelp(msg.chat.id,msg.chat.username)
            }
    
            // else {
            //     await bot.sendMessage(msg.chat.id, msg.text);
            // }
    
        }
        catch(error) {
    
            console.log(error);
    
        }
    });
}
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

async function checkUserExist(userChatId,username,category) {
    try {
        const response = await fetch(`http://localhost:3000/user/${userChatId}`);
        const userData = await response.json();

        if (userData.chatId) {
            createGoal(userChatId,category);
        } else {
            let user = {
                chatId: userChatId,
                name: username
            }
            let response = await fetch(`http://localhost:3000/user/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
              });
              if (response.ok) {
                // Если статус ответа в диапазоне 200-299, это означает, что запрос выполнен успешно
                console.log("Пользователь успешно создан");
                createGoal(userChatId,category);
                // Теперь можно обработать ответ сервера, если это необходимо
                let userData = await response.json(); // Предположим, что сервер возвращает информацию о созданном пользователе в формате JSON
                // console.log(userData); // Вывод информации о созданном пользователе
            } else {
                // Если статус ответа не в диапазоне 200-299, это означает, что возникла ошибка
                console.error("Ошибка при создании пользователя:", response.status);
                // Можно также обработать тело ответа, чтобы получить дополнительную информацию об ошибке
                let errorMessage = await response.text();
                console.error(errorMessage); // Вывод сообщения об ошибке
            }
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        // bot.sendMessage(2019712807, `Произошла ошибка при проверке пользователя`);
    }
}
// Функция для отправки категорий пользователю
function getCategories(chatId) {
    fetch('http://localhost:3000/category')
        .then(response => response.json())
        .then(data => {
            const inlineKeyboard = data.map(item => {
                return [{ text: item.name, callback_data: item.name }];
            });
            const replyMarkup = {
                inline_keyboard: inlineKeyboard
            };

            // Отправляем сообщение с кнопками категорий
            bot.sendMessage(chatId, 'Категории:', {
                reply_markup: replyMarkup
            })
            .catch(error => console.error('Ошибка при отправке сообщения с категориями:', error));
        })
        .catch(error => console.error('Ошибка при получении данных категорий:', error));
}

function createGoal(chatId, category) {
    isCreatingGoal = true; // Устанавливаем флаг в true при начале создания цели
    let goalName = '';
    let goalDescription = '';
    let deadline = '';

    // Функция для запроса названия цели
    function askGoalName(category) {
        bot.sendMessage(chatId, 'Принято👍 А теперь дай название своей цели').then(async ()=>{
           await bot.sendMessage(chatId, '<b>Пример:</b> Научиться танцевать.',{parse_mode: "HTML"})
            .then(() => {
                bot.once('text', msg => {
                    const message = msg.text.toLowerCase();

                    switch (message) {
                        case "/start":
                        case "/goals":
                        case "/help":
                        case "⚡️ есть цель":
                        case "⭐️ мои цели":
                            if (isCreatingGoal) {
                                bot.sendMessage(chatId, 'Запрещенное действие! Вы находитесь в процессе создания цели. \n Напишите /exit, если хотите выйти из режима.');
                                createGoal(categoryName);
                            } else {
                                bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                            }
                            break;
                        case "/exit":
                            isCreatingGoal = false;
                            bot.sendMessage(chatId, 'Создание цели отменено.');
                            getStartAgain(chatId);
                            break;
                        default:
                            if (isCreatingGoal) {
                                goalName = msg.text;
                                askGoalDescription(category);
                            }
                    }
                });
            });
        })
        
    }

    // Функция для запроса описания цели
    function askGoalDescription(category) {
        bot.sendMessage(chatId, 'Отлично! Укажи, какого результата планируешь достичь и подробнее опиши, как собираешься это делать⚡️🔝').then(async ()=>{
           await bot.sendMessage(chatId, '<b>Пример:</b> Желаю создать собственный видео-клип и освоить навыки монтажа, чтобы использовать их в будущей работе на телевидении.',{parse_mode: "HTML"})
            bot.once('text', msg => {
                goalDescription = msg.text;
                const message = msg.text.toLowerCase();
                switch (message) {
                    case "/start":
                    case "/goals":
                    case "/help":
                    case "⚡️ есть цель":
                    case "⭐️ мои цели":
                        if (isCreatingGoal) {
                            bot.sendMessage(chatId, 'Запрещенное действие! Вы находитесь в процессе создания цели. \n Напишите /exit, если хотите выйти из режима.');
                            createGoal(categoryName);
                        } else {
                            bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                        }
                        break;
                    case "/exit":
                        isCreatingGoal = false;
                        bot.sendMessage(chatId, 'Создание цели отменено.');
                        getStartAgain(chatId);
                        break;
                    default:
                        if (isCreatingGoal) {
                            goalName = msg.text;
                            askDeadline(category); // Запрашиваем дедлайн после получения описания
                        }
                }
                
            });
        });
        
    }

    // Функция для запроса дедлайна
    function askDeadline(category) {
        bot.sendMessage(chatId, 'К какой дате ты хочешь достичь своей цели? (в формате ДД.ММ.ГГГГ):')
            .then(() => {
                bot.once('text', async msg => {
                    const deadlinePattern = /^\d{2}\.\d{2}\.\d{4}$/;
                    if (!deadlinePattern.test(msg.text)) {
                        bot.sendMessage(chatId, 'Неверный формат дедлайна. Пожалуйста, введите дедлайн в формате ДД.ММ.ГГГГ:');
                        askDeadline(category); // Повторяем запрос дедлайна
                        return;
                    }
                    const message = msg.text.toLowerCase();
                    switch (message) {
                        case "/start":
                        case "/goals":
                        case "/help":
                        case "⚡️ есть цель":
                        case "⭐️ мои цели":
                            if (isCreatingGoal) {
                                bot.sendMessage(chatId, 'Запрещенное действие! Вы находитесь в процессе создания цели. \n Напишите /exit, если хотите выйти из режима.');
                                createGoal(categoryName);
                            } else {
                                bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                            }
                            break;
                        case "/exit":
                            isCreatingGoal = false;
                            bot.sendMessage(chatId, 'Создание цели отменено.');
                            getStartAgain(chatId);
                            break;
                        default:
                            console.log('капец что ты с этим миром не так')
                    }
                    
                    deadline = msg.text;
                    // Преобразование строки дедлайна в объект Date
                    const parts = deadline.split('.');
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1; // Месяцы в JS начинаются с 0
                    const year = parseInt(parts[2], 10);
                    curDeadline = new Date(year, month, day);
                    const currentTime = new Date();
                    console.log(`текущее время ${currentTime}`);
                    console.log(`сам дедлайн ${curDeadline}`);
                    let goal = {
                        name: goalName,
                        description: goalDescription,
                        deadline: curDeadline,
                        categoryName: category
                    }
                    
                    // console.log('Название цели:', goalName);
                    // console.log('Описание цели:', goalDescription);
                    // console.log('Дедлайн:', curDeadline);
                    // console.log('Категория:', category);
                    let response = await fetch(`http://localhost:3000/goal/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(goal)
              });
              if (response.ok) {
                let responseData = await response.json();
                let goalId = responseData.id;
                let userGoal = {
                    "userId": chatId,
                    "goalId": goalId
                };
                let response2 = await fetch('http://localhost:3000/usergoal/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userGoal)
                });
                let progressInfoFirst = {
                    "result": "",
                    "dateChecked": "",
                    "admin": "",
                    "goalId": goalId,
                    "status": "active",
                    "comment": ""
                }
                //тут должен быть вызов функции квиза
               
                
                
                
                
                let response3 = await fetch('http://localhost:3000/progressinfo/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(progressInfoFirst)
                }); 
                if (response3.ok) {
                    const responseBody = await response3.json();
                    progressinfoId = responseBody.id;
                    console.log('Прогресс инфо успешно создан')
                }
                if (response2.ok) {
                    console.log("Цель успешно создан");
                    let goalData = await response2.json();
                } else {
                    console.error("Ошибка при создании цели:", response2.status);
                    let errorMessage = await response2.text();
                    console.error(errorMessage);
                }
                await bot.deleteMessage(msg.chat.id, msg.message_id);
                getQuiz(chatId,goalId,deadline,progressinfoId);
            } else {
                console.error("Ошибка при получении данных:", response.status);
                let errorMessage = await response.text();
                console.error(errorMessage);
            }
            
                    // bot.sendMessage(chatId, 'Цель поставлена успешно!\nТеперь приступай к реализации⚡️\n за выполнение ');
                    isCreatingGoal = false;
                });
            });
            
    }

    // Начинаем процесс создания цели с запроса названия
    askGoalName(category);
}


async function getStatus(idProgress) {
    const responseForStatus = await fetch(`http://localhost:3000/progressinfo/${idProgress}`);

    if (!responseForStatus.ok) {
        throw new Error(`HTTP error status: ${responseForStatus.status}`);
    }

    // Получаем тело ответа и преобразуем его в JSON
    const data = await responseForStatus.json();

    // Извлекаем поле status из тела ответа
    const status = data.status;

    console.log('Status:', status);
    return status;
}
//функция для прохождения опросника
function getQuiz(chatId, goalId,deadline,idProgress) {
    bot.sendMessage(chatId, 'Здорово! Цель достойна реализации🔝 \nА теперь давай проверим твою готовность для ее достижения😏 ').then(()=>{
        bot.sendMessage(chatId, 'Ответь на несколько вопросов и напиши готов(а)»').then(()=>{
            bot.sendMessage(chatId, `http://localhost:3001/quiz?goalId=${goalId}&userId=${chatId}`);
        })
        bot.on('text', async msg => {
            let message = msg.text;
            if (msg.text.toLowerCase() === 'готово' || msg.text.toLowerCase() === 'готова') {
                console.log('тут доходит');
                console.log(msg.text);

                try {
                    const response = await fetch(`http://localhost:3000/quiz/${goalId}`);
                    
                    if (response.ok) {
                        
                        // Запись существует, отправляем пользователю сообщение
                        bot.sendMessage(chatId, 'Отлично Обрабатываю заявку…');
                        setTimeout(() => {
                            const status = getStatus(idProgress).then(status=>{
                                if(status!='active' && status =='inProgress'){
                                    bot.sendMessage(chatId, 'Момент настал – ДВИГАЙ к своей цели⚡😀\nДостигай успехов в указанный срок и присылай свои результаты (фото, видео, аудио и др. подтверждения) 🙌 И жди награду за свою целеустремленность/\nЦелеустремленность приносит подарочки/ Целеустремленность вознаграждается)/Стремления всегда вознаграждаются😁');
                                    checkDeadlineAndNotify(chatId,deadline,idProgress)
                                } 
                                bot.sendMessage(chatId, `статус: ${status}`);
                                if (status == 'canceled') {
                                    bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!').then(async () => {
                                        const responseForMessage = await fetch(`http://localhost:3000/progressinfo/${idProgress}`);
                                        if (responseForMessage.ok) {
                                            const responseBodyMessage = await responseForMessage.json();
                                            let messageOfAdmin = responseBodyMessage.comment;
                                            bot.sendMessage(chatId, `Отзыв от админа: ${messageOfAdmin}`);
                                        }
                                    });
                                }
                            });
                            
                        }, 1000 * 60); // Например, отправляем через 5 минут
                    } else {
                        console.log('Запись не найдена');
                    }
                } catch (error) {
                    console.error('Ошибка при отправке запроса:', error);
                }
            } else {
                // Обработка других ответов пользователя
            }
        });
    });
}

function checkDeadlineAndNotify(chatId,deadlineString,idProgress) {
    // Получаем сегодняшнюю дату
    const today = new Date();

    // Преобразуем сегодняшнюю дату в формат ISO 8601
    const todayISO = today.toISOString();

    // Преобразуем строку дедлайна в объект Date
    const deadline = new Date(deadlineString);

    // Вычисляем разницу во времени в миллисекундах
    // const timeDifferenceInMilliseconds = deadline.getTime() - today.getTime();
    const timeDifferenceInMilliseconds = 1000*60*2;
    let monthInMilliseconds = 1000*60*60*24*30;
    let firstWeek = 1000*60*60*7;//неделя
    let firstFithDays = 1000*60*60*15;//15 число
    let weekBeforeFinished = timeDifferenceInMilliseconds-firstWeek;//23 число
    // Если время уже прошло, выводим сообщение
    if (timeDifferenceInMilliseconds <= 0) {
        bot.sendMessage(chatId, 'Все сроки наступили');
        return;

    } else if (timeDifferenceInMilliseconds >= monthInMilliseconds) {
        setTimeout(() => {
            getNewQuote(chatId);

        }, firstWeek);
        setTimeout(() => {
            getNewQuote(chatId,'yes');

        }, firstFithDays);
        setTimeout(() => {
            getNewQuote(chatId,'yes');

        }, weekBeforeFinished);
    } else if(timeDifferenceInMilliseconds<monthInMilliseconds) {
        let half = timeDifferenceInMilliseconds/2;
        setTimeout(() => {
            getNewQuote(chatId,'yes');

        }, half);
    }

    // Устанавливаем таймер, который будет активироваться через разницу во времени
    setTimeout(() => {
        bot.sendMessage(chatId, 'Все сроки наступили');
        checkEnd(chatId,idProgress)
    }, timeDifferenceInMilliseconds);
}



function checkEnd(chatId,idProgress) {
    bot.sendMessage(chatId, `Привет, самый целеустремленный в мире человек!\nХвастайся, сегодня можно😜 С нетерпением ждем твоих результатов🔝`);
    downloadRes(chatId,idProgress);
}
function needHelp(chatId,name) {
    let descr;
    bot.sendMessage(chatId, 'Привет! Распиши одним сообщением, пожалуйста, что случилось и в чем тебе нужна помощь?');
    bot.on('text', async msg => {
        descr = msg.text;
        let helpInfo = {
            "userId": chatId,
            "nickName": name,
            "Helped": false,
            "Description": descr,
        }
        let responseForHelp = await fetch('http://localhost:3000/help-req/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(helpInfo)
        }); 
        if(responseForHelp.ok) {
            bot.sendMessage(chatId, 'Твой зов о помощи принят! Не унывай, ведь скоро Наша команда поможет тебе💪');
        }
    });
}

function getNewQuote(chatId,needHelp='') {
  // Если все цитаты были использованы, сбросить массив
  if (usedQuotes.length === quotes.length) {
    usedQuotes = [];
  }
  
  // Выбрать случайную цитату из списка
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex];
  
  // Проверить, использовалась ли эта цитата ранее
  while (usedQuotes.includes(randomQuote)) {
    randomIndex = Math.floor(Math.random() * quotes.length);
    randomQuote = quotes[randomIndex];
  }
  
  // Добавить цитату в список использованных и вернуть ее
  usedQuotes.push(randomQuote);
  if(needHelp) {
    bot.sendMessage(chatId, `${randomQuote}\n Если у тебя возникли проблемы, то мы тебе поможем.\nПиши /helpme!`);
            bot.sendPhoto(chatId, './media/memes/image.jpg');
  } else {
    bot.sendMessage(chatId, `${randomQuote} Надеюсь у тебя все хорошо! Продолжай в том же духе и помни!`).then(()=>{
        bot.sendPhoto(chatId, './media/memes/image.jpg');
    });

  }
 
}
function getStartAgain(chatId) {
    bot.sendMessage(chatId, 'Ты вернулся в начальный режим!');
    bot.sendMessage(chatId, ' ', {
        reply_markup: {
            inline_keyboard: [
                [{text: '⚡️ ЕСТЬ ЦЕЛЬ', callback_data: 'createGoal'}, {text: '⭐️ МОИ ЦЕЛИ', callback_data: 'showGoals'}],
                [{text: 'Закрыть Меню', callback_data: 'closeMenu'}]
            ]
        }
    });
}

function downloadRes(chatId,idProgress) {
    const fs = require('fs');
    const dirPathImg = '../tg-bot-frontend/media/' + chatId+idProgress + '/image';
    const dirPathVideo = '../YourBotFolder/media/' + chatId+idProgress + '/video';

    bot.sendMessage(chatId, 'отправь свой результат в формате ФОТО!');
    //photo
    bot.on('photo', async img => {

        try {
            if (!fs.existsSync(dirPathImg)) {
                fs.mkdirSync(dirPathImg, { recursive: true });
            }
    
            await bot.downloadFile(img.photo[img.photo.length-1].file_id, dirPathImg);
            bot.sendMessage(chatId, 'Отлично! Обрабатываю результаты…');
            setTimeout(() => {
                const status = getStatus(idProgress);
                if(status!='inProgress' && status=='done'){
                    bot.sendMessage(chatId, 'Поздравляю!  Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок/ За свою целеустремленность держи подарочек …(ссылка, промокод, файл, другая информация) Продолжай в том же духе - достигай целей и становись лучше!»');

                } else {
                    bot.sendMessage(chatId,'Твоя цель была отклонена, пожалуйста попробуй снова!')
                }
            }, 1000 * 60); // Например, отправляем через 5 минут
        }

    
        
        catch(error) {
    
            console.log(error);
    
        }
   
     });
}

async function deleteEntities(entity, id) {
    const entities = ['progressinfo', 'goal', 'user'];
    if (entities.includes(entity)) {
      const responseToDelete = await fetch(`http://localhost:3000/${entity}/${id}`, {
        method: 'DELETE'
      });
  
      if (responseToDelete.ok) {
        // Обработка успешного удаления
        console.log(`${entity} с идентификатором ${id} был успешно удален.`);
      } else {
        // Обработка ошибки удаления
        console.error(`Ошибка при удалении ${entity} с идентификатором ${id}`);
      }
    } else {
      console.error('Недопустимая сущность для удаления');
    }
  }