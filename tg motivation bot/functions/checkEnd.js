function checkEnd(chatId,idProgress) {
    bot.sendMessage(chatId, `Привет, самый целеустремленный в мире человек!\nХвастайся, сегодня можно😜 С нетерпением ждем твоих результатов🔝`);
    downloadRes(chatId,idProgress);
}

module.exports = {checkEnd};