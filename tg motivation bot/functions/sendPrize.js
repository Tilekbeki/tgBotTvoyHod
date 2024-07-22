async function sendPrize(bot, id, chatId) {
    const fs = require('fs');
    try {
        const response = await fetch('http://localhost:3000/prize/2', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const base64Content = data.content;
            const buffer = Buffer.from(base64Content, 'base64');
            let tempFilePath;
            if(data.type == 'file') {
                tempFilePath = `./Приз для ${chatId}.docx`;
            } 
            if(data.type == 'promo') {
                tempFilePath = `./Приз для ${chatId}.jpg`;
            }

            fs.writeFileSync(tempFilePath, buffer);

            bot.sendDocument(chatId, tempFilePath).then(() => {
                fs.unlinkSync(tempFilePath);
            }).catch(err => {
                console.error(err);
            });
        } else {
            bot.sendMessage(chatId, 'Ошибка при получении файла с сервера');
        }
    } catch (error) {
        bot.sendMessage(chatId, 'Произошла ошибка: ' + error.message);
    }
}

module.exports = {sendPrize};