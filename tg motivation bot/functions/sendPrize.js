async function sendPrize(bot, goalId, chatId) {
    const fs = require('fs');
    try {
        const response = await fetch(`http://localhost:3000/user-Prizes/${goalId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const base64Content = data.prizeName;
            const buffer = Buffer.from(base64Content, 'base64');
            let tempFilePath;
            if(data.prizeType == 'file') {
                tempFilePath = `./Приз для ${chatId}.docx`;
            } 
            if(data.prizeType == 'promo') {
                tempFilePath = `./Приз для ${chatId}.jpg`;
            }

            fs.writeFileSync(tempFilePath, buffer);

            bot.sendDocument(chatId, tempFilePath).then(() => {
                fs.unlinkSync(tempFilePath);
            }).catch(err => {
                console.error(err);
            });
            bot.sendMessage(chatId, 'Давайка проверим уровень твоей мотивации сейчас;)');
            bot.sendMessage(chatId, `http://localhost:3001/quizlast?goalId=${goalId}&userId=${chatId}&isFirst=true`)
        }
    } catch (error) {
        bot.sendMessage(chatId, 'Произошла ошибка: ' + error.message);
    }
}

module.exports = {sendPrize};