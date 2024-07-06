function getNewQuote(bot,chatId,needHelp='') {
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

module.exports = {getNewQuote};