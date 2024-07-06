//функция для прохождения опросника
function getQuiz(bot, chatId, goalId, deadline, idProgress) {
    bot.sendMessage(chatId, 'Здорово! Цель достойна реализации🔝 \nА теперь давай проверим твою готовность для ее достижения😏 ').then(()=>{
        bot.sendMessage(chatId, 'Ответь на несколько вопросов и напиши готов(а)»').then(()=>{
            bot.sendMessage(chatId, `http://localhost:3001/quiz?goalId=${goalId}&userId=${chatId}`);
        })
        bot.on('text', async msg => {
            let message = msg.text;
            if (msg.text.toLowerCase() === 'готово' || msg.text.toLowerCase() === 'готова') {
                console.log('тут доходит');
                console.log(msg.text);

                try {
                    const response = await fetch(`http://localhost:3000/quiz/${goalId}`);
                    
                    if (response.ok) {
                        
                        // Запись существует, отправляем пользователю сообщение
                        bot.sendMessage(chatId, 'Отлично Обрабатываю заявку…');
                        setTimeout(() => {
                            const status = getStatus(bot, idProgress).then(status=>{
                                if(status!='active' && status =='inProgress'){
                                    bot.sendMessage(chatId, 'Момент настал – ДВИГАЙ к своей цели⚡😀\nДостигай успехов в указанный срок и присылай свои результаты (фото, видео, аудио и др. подтверждения) 🙌 И жди награду за свою целеустремленность/\nЦелеустремленность приносит подарочки/ Целеустремленность вознаграждается)/Стремления всегда вознаграждаются😁');
                                    checkDeadlineAndNotify(bot, chatId, deadline, idProgress)
                                } 
                                bot.sendMessage(chatId, `статус: ${status}`);
                                if (status == 'canceled') {
                                    bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!').then(async () => {
                                        const responseForMessage = await fetch(`http://localhost:3000/progressinfo/${idProgress}`);
                                        if (responseForMessage.ok) {
                                            const responseBodyMessage = await responseForMessage.json();
                                            let messageOfAdmin = responseBodyMessage.comment;
                                            bot.sendMessage(chatId, `Отзыв от админа: ${messageOfAdmin}`);
                                        }
                                    });
                                }
                            });
                            
                        }, 1000 * 60); // Например, отправляем через 5 минут
                    } else {
                        console.log('Запись не найдена');
                    }
                } catch (error) {
                    console.error('Ошибка при отправке запроса:', error);
                }
            } else {
                // Обработка других ответов пользователя
            }
        });
    });
}

module.exports = {getQuiz};