const { checkDeadlineAndNotify } = require('./checkDeadlineAndNotify');
const { getStatus } = require('./getStatus');
const { deleteEntities } = require('./deleteEntity');

// функция для прохождения опросника
function getQuiz(bot, chatId, goalId, deadline, idProgress, isFirst) {
    if (isFirst) {
        bot.sendMessage(chatId, 'Здорово! Цель достойна реализации🔝 \nА теперь давай проверим твою готовность для ее достижения😏 ').then(() => {
            bot.sendMessage(chatId, 'Ответь на несколько вопросов и напиши готов(а)»').then(() => {
                bot.sendMessage(chatId, `http://localhost:3001/quiz?goalId=${goalId}&userId=${chatId}&isFirst=true`);
            });

            bot.once('text', async msg => {
                let message = msg.text;
                if (message.toLowerCase() === 'готов' || message.toLowerCase() === 'готова') {
                    try {
                        const response = await fetch(`http://localhost:3000/quiz/${goalId}`);
                        if (response.ok) {
                            bot.sendMessage(chatId, 'Отлично Обрабатываю заявку…');
                            setTimeout(async () => {
                                const status = await getStatus(bot, idProgress);
                                if (status === 'active' || status === 'inProgress') {
                                    bot.sendMessage(chatId, 'Момент настал – ДВИГАЙ к своей цели⚡😀\nДостигай успехов в указанный срок и присылай свои результаты (фото, видео, аудио и др. подтверждения) 🙌 И жди награду за свою целеустремленность/\nЦелеустремленность приносит подарочки/ Целеустремленность вознаграждается)/Стремления всегда вознаграждаются😁');
                                    checkDeadlineAndNotify(bot, chatId, deadline, idProgress, goalId);
                                } else if (status === 'canceled') {
                                    deleteEntities(bot, 'quiz', goalId);
                                    bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!').then(async () => {
                                        const responseForMessage = await fetch(`http://localhost:3000/progressinfo/${idProgress}`);
                                        if (responseForMessage.ok) {
                                            const responseBodyMessage = await responseForMessage.json();
                                            let messageOfAdmin = responseBodyMessage.comment;
                                            bot.sendMessage(chatId, `Отзыв от админа: ${messageOfAdmin}`);
                                        }
                                    });
                                } else {
                                    bot.sendMessage(chatId, `Статус: ${status}`);
                                }
                            }, 1000 * 60); // Проверяем статус через 1 минуту
                        } else {
                            console.log('Запись не найдена');
                            askToFillQuiz();
                        }
                    } catch (error) {
                        console.error('Ошибка при отправке запроса:', error);
                        askToFillQuiz();
                    }
                } else {
                    askToFillQuiz();
                }
            });

            function askToFillQuiz() {
                bot.sendMessage(chatId, 'Пожалуйста, напишите "готов" или "готова", чтобы продолжить.');
                getQuiz(bot, chatId, goalId, deadline, idProgress, isFirst);
            }
        });
    } else {
        bot.sendMessage(chatId, 'Давай ка проверим уровень твоей мотивации сейчас!').then(() => {
            bot.sendMessage(chatId, `http://localhost:3001/quiz?goalId=${goalId}&userId=${chatId}&isFirst=false`);

            bot.once('text', async msg => {
                let message = msg.text;
                bot.sendMessage(chatId, 'Пожалуйста, напишите "готов" или "готова", чтобы продолжить.');
                if (message.toLowerCase() === 'готов' || message.toLowerCase() === 'готова') {
                    setTimeout(async () => {
                        const response2 = await fetch(`http://localhost:3000/quiz/${goalId}`);
                        if (response2.ok) {
                            bot.sendMessage(chatId, 'Отлично! Обрабатываю заявку…');
                        } else {
                            console.log('Запись не найдена');
                            askToFillQuiz();
                        }
                    }, 1000 * 60); // Проверяем статус через 1 минуту
                } else {
                    askToFillQuiz();
                }
            });

            function askToFillQuiz() {
                bot.sendMessage(chatId, 'Пожалуйста, напишите "готов" или "готова", чтобы продолжить.');
                getQuiz(bot, chatId, goalId, deadline, idProgress, isFirst);
            }
        });
    }
}

module.exports = { getQuiz };
