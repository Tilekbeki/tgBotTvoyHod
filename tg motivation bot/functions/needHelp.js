function needHelp(bot, chatId, name) {
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
module.exports = {needHelp};