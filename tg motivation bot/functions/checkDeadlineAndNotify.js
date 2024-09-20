const {getNewQuote} = require('./getNewQuote');
const {checkEnd} = require('./checkEnd');
const {downloadRes} = require('./downloadRes');

function checkDeadlineAndNotify(bot, chatId, deadlineString, idProgress, goalId, app) {
    // Получаем сегодняшнюю дату
    const today = new Date();

    // Преобразуем сегодняшнюю дату в формат ISO 8601
    const todayISO = today.toISOString();

    // Преобразуем строку дедлайна в объект Date
    const deadline = new Date(deadlineString);

    // Вычисляем разницу во времени в миллисекундах
    const timeDifferenceInMilliseconds = 1000 * 60 * 2;
    const monthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
    const firstWeek = 1000 * 60 * 60 * 7; // неделя
    const firstFifteenDays = 1000 * 60 * 60 * 15; // 15 число
    const weekBeforeFinished = timeDifferenceInMilliseconds - firstWeek; // 23 число

    // Массив для хранения идентификаторов таймеров
    let timeouts = [];

    // Если время уже прошло, выводим сообщение
    if (timeDifferenceInMilliseconds <= 0) {
        bot.sendMessage(chatId, 'Все сроки наступили');
        return;
    } else if (timeDifferenceInMilliseconds >= monthInMilliseconds) {
        timeouts.push(setTimeout(() => {
            getNewQuote(bot, chatId);
        }, firstWeek));
        timeouts.push(setTimeout(() => {
            getNewQuote(bot, chatId, 'yes');
        }, firstFifteenDays));
        timeouts.push(setTimeout(() => {
            getNewQuote(bot, chatId, 'yes');
        }, weekBeforeFinished));
    } else if (timeDifferenceInMilliseconds < monthInMilliseconds) {
        const half = timeDifferenceInMilliseconds / 2;
        timeouts.push(setTimeout(() => {
            getNewQuote(bot, chatId, 'yes');
        }, half));
    }

    // Устанавливаем таймер, который будет активироваться через разницу во времени
    timeouts.push(setTimeout(() => {
        bot.sendMessage(chatId, 'Все сроки наступили');
        console.log(`айди потерянного прогресса ${idProgress}`)
        checkEnd(bot, chatId, idProgress, goalId, app);
    }, timeDifferenceInMilliseconds));

    //Реакция на отправку результата
    // bot.on('photo', async img => {
    //     try {
    //         // Очистка всех таймеров
    //         timeouts.forEach(timeout => clearTimeout(timeout));

    //         await bot.sendMessage(chatId, "Вау! Я вижу ты реализовал свою цель раньше! \nДавай зафиксируем результат.💪\nНапиши команду /result");
    //     } catch (error) {
    //         console.error('Ошибка при отправке сообщения:', error);
    //     }
    // });


    const {downloadRes} = require('./downloadRes');
    bot.on('text', async msg => {
        if (msg.text==='/complete') {
            if (chatId) { // Убедимся, что команда от того же пользователя
                timeouts.forEach(timeout => clearTimeout(timeout));
                bot.sendMessage(chatId, 'Mission completed! Сделал дело – гуляй смело! ⚡️ Присылай результат.');
                downloadRes(bot, chatId, idProgress, goalId, app); // Вызов downloadRes
                return; // Завершаем выполнение, чтобы прервать все дальнейшие действия
            }
        }
    });

 
}

module.exports = {checkDeadlineAndNotify};
