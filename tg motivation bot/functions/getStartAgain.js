function getStartAgain(bot, chatId) {
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

module.exports = {getStartAgain};