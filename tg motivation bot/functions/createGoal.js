const {getStartAgain}  = require('./getStartAgain');
const {getQuiz}  = require('./getQuiz');

function createGoal(bot, chatId, category) {
    isCreatingGoal = true; // Устанавливаем флаг в true при начале создания цели
    let goalName = '';
    let goalDescription = '';
    let deadline = '';

    // Функция для запроса названия цели
    function askGoalName(bot, category) {
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
                                createGoal(bot, categoryName);
                            } else {
                                bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                            }
                            break;
                        case "/exit":
                            isCreatingGoal = false;
                            bot.sendMessage(chatId, 'Создание цели отменено.');
                            getStartAgain(bot, chatId);
                            break;
                        default:
                            if (isCreatingGoal) {
                                goalName = msg.text;
                                askGoalDescription(bot, category);
                            }
                    }
                });
            });
        })
        
    }

    // Функция для запроса описания цели
    function askGoalDescription(bot, category) {
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
                            createGoal(bot, categoryName);
                        } else {
                            bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                        }
                        break;
                    case "/exit":
                        isCreatingGoal = false;
                        bot.sendMessage(chatId, 'Создание цели отменено.');
                        getStartAgain(bot, chatId);
                        break;
                    default:
                        if (isCreatingGoal) {
                            goalName = msg.text;
                            askDeadline(bot, category); // Запрашиваем дедлайн после получения описания
                        }
                }
                
            });
        });
        
    }

    // Функция для запроса дедлайна
    function askDeadline(bot, category) {
        bot.sendMessage(chatId, 'К какой дате ты хочешь достичь своей цели? (в формате ДД.ММ.ГГГГ):')
            .then(() => {
                bot.once('text', async msg => {
                    const deadlinePattern = /^\d{2}\.\d{2}\.\d{4}$/;
                    if (!deadlinePattern.test(msg.text)) {
                        bot.sendMessage(chatId, 'Неверный формат дедлайна. Пожалуйста, введите дедлайн в формате ДД.ММ.ГГГГ:');
                        askDeadline(bot, category); // Повторяем запрос дедлайна
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
                                createGoal(bot, categoryName);
                            } else {
                                bot.sendMessage(chatId, 'Такой команды нет в этом контексте.');
                            }
                            break;
                        case "/exit":
                            isCreatingGoal = false;
                            bot.sendMessage(chatId, 'Создание цели отменено.');
                            getStartAgain(bot, chatId);
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
                getQuiz(bot, chatId, goalId, deadline, progressinfoId, true);
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
    askGoalName(bot, category);
}

module.exports = {createGoal};