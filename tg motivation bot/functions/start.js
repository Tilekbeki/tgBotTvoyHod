const {downloadRes}  = require('./downloadRes');
const {getNewQuote}  = require('./getNewQuote');
const fs = require('fs');
const {needHelp}  = require('./needHelp');
function start(bot){
    bot.on('text', async msg => {
        try {
    
            if(msg.text == '/start') {
                
                await bot.sendMessage(msg.chat.id, `Бодрого денечка, человек👋 \nЯ помогу тебе ВОПЛОТИТЬ ЦЕЛИ в жизнь и доказать, что для тебя НЕТ НЕВОЗМОЖНОГО⚡ Твои успехи точно принесут свои плоды (P.S. сервис «ДВИГАЙ!» гарантирует😉`);
                await bot.sendMessage(msg.chat.id, `А еще мы поощряем целеустремленных, так что ДВИГАЙ!`);
                await bot.sendMessage(msg.chat.id, `Вот что я могу тебе предложить:`, {
    
                    reply_markup: {
            
                        inline_keyboard: [
            
                            [{text: '⚡️ ЕСТЬ ЦЕЛЬ', callback_data: 'createGoal'},{text: '⭐️ МОИ ЦЕЛИ', callback_data: 'showGoals'}],
                            [{text: 'Закрыть Меню', callback_data: 'closeMenu'}]
            
                        ]
            
                    }
            
                })
                
            }
            else if(msg.text == '/goals') {
    
                await bot.sendMessage(msg.chat.id, `Ваши цели список*`);
    
            }
            else if(msg.text == '/help' || msg.text == '👁‍🗨 Помощь') {
    
                await bot.sendMessage(msg.chat.id, `Если возникли технические проблемы свяжитесь  @VlaStrel*`);
    
            }
            else if(msg.text == '/menu') {
    
                await bot.sendMessage(msg.chat.id, `Меню бота`, {
            
                    reply_markup: {
            
                        keyboard: [
            
                            ['⚡️ ЕСТЬ ЦЕЛЬ', '⭐️ МОИ ЦЕЛИ'],
                            ['👁‍🗨 Помощь']
            
                        ]
            
                    }
            
                })
            
            }
            else if(msg.text == '/result') {
                downloadRes(bot, msg.chat.id, 2);
            }
            else if (msg.text == '/getMotivation') {
                getNewQuote(bot,msg.chat.id);
            } 
            else if (msg.text=='/helpme') {
                needHelp(bot, msg.chat.id, msg.chat.username)
            }

            else if (msg.text=='/prize') {
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
                            tempFilePath = `./Приз для ${msg.chat.username}.docx`;
                        } 
                        if(data.type == 'promo') {
                            tempFilePath = `./Приз для ${msg.chat.username}.jpg`;
                        }
            
                        fs.writeFileSync(tempFilePath, buffer);
            
                        bot.sendDocument(msg.chat.id, tempFilePath).then(() => {
                            fs.unlinkSync(tempFilePath);
                        }).catch(err => {
                            console.error(err);
                        });
                    } else {
                        bot.sendMessage(msg.chat.id, 'Ошибка при получении файла с сервера');
                    }
                } catch (error) {
                    bot.sendMessage(msg.chat.id, 'Произошла ошибка: ' + error.message);
                }
            }
            // else {
            //     await bot.sendMessage(msg.chat.id, msg.text);
            // }
    
        }
        catch(error) {
    
            console.log(error);
    
        }
    });
}

module.exports = {start};