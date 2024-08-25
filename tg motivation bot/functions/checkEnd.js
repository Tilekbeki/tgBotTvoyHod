function checkEnd(bot, chatId, idProgress, goalId, app) {
    const { downloadRes }  = require('./downloadRes');
    bot.sendMessage(chatId, `Привет, самый целеустремленный в мире человек!\nХвастайся, сегодня можно😜 С нетерпением ждем твоих результатов🔝`);
    downloadRes(bot, chatId, idProgress, goalId, app);
}

module.exports = {checkEnd};