const {downloadRes}  = require('./downloadRes');
const {getNewQuote}  = require('./getNewQuote');
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
                downloadRes(bot, msg.chat.id, 1);
            }
            else if (msg.text == '/getMotivation') {
                getNewQuote(bot,msg.chat.id);
            } 
            else if (msg.text=='/helpme') {
                needHelp(bot, msg.chat.id, msg.chat.username)
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