const {downloadRes}  = require('./downloadRes');
function checkEnd(bot, chatId, idProgress, goalId) {
    bot.sendMessage(chatId, `Привет, самый целеустремленный в мире человек!\nХвастайся, сегодня можно😜 С нетерпением ждем твоих результатов🔝`);
    downloadRes(bot, chatId, idProgress, goalId);
}

module.exports = {checkEnd};