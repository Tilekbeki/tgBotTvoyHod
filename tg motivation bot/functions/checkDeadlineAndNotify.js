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
module.exports = {checkDeadlineAndNotify};