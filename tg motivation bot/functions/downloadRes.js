const deleteEntities = require('./deleteEntity');
function downloadRes(bot, chatId, idProgress) {
    const fs = require('fs');
    const dirPathImg = './media/' + chatId+idProgress + '/image';
    const sendPrize = require('./sendPrize');
    
    let downloadedImgUrl;
    deleteEntities(bot,'result',1)
    bot.sendMessage(chatId, 'Ваш результат фото или видео? Если фото напишите ФОТО, если видео то ВИДЕО');
    bot.on('message', async (msg) => {
        const text = msg.text.toLowerCase();
      
        if (text === 'фото') {
          bot.sendMessage(chatId, 'Отправьте фото для обработки');
          downloadPhoto();
        } else if (text === 'видео') {
          bot.sendMessage(chatId, 'Отправьте ссылку в общем доступе для обработки видео(например ссылка на ютуб ролик)');
          downloadVideo();
        } 
        else {
          bot.sendMessage(chatId, 'Пожалуйста, выберите и отправьте фото или видео');
        }
      });
    function downloadPhoto() {}
    //photo
        bot.on('photo', async img => {

            try {
                if (!fs.existsSync(dirPathImg)) {
                    fs.mkdirSync(dirPathImg, { recursive: true });
                }
                try {
                    await bot.downloadFile(img.photo[0].file_id, dirPathImg);
                    const photoPath = await bot.downloadFile(img.photo[0].file_id, dirPathImg);
                    downloadedImgUrl = `./${photoPath}`;
                    const imageBuffer = fs.readFileSync(downloadedImgUrl);
                    const base64Image = imageBuffer.toString('base64');
                    console.log(base64Image);
                    const resultData = {
                        link: `data:image/jpeg;base64,${base64Image}`,
                        type: "img",
                        progressInfoId: idProgress
                    };
                    let responseResult = await fetch('http://localhost:3000/result/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(resultData)
                    }); 
                    if(responseResult.ok) {
                        bot.sendMessage(chatId, 'Отлично! Обрабатываю результаты…');
                    }
                    bot.sendPhoto(chatId, downloadedImgUrl);
                } catch (error) {
                    console.error(error);
                }
                
                setTimeout(() => {
                    const status = getStatus(idProgress);
                    if(status!='inProgress' && status=='done'){
                        bot.sendMessage(chatId, 'Поздравляю!  Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');

                    } else {
                        bot.sendMessage(chatId,'Твоя цель была отклонена, пожалуйста попробуй снова!')
                    }
                }, 1000 * 60); // Например, отправляем через 5 минут
            }

        
            
            catch(error) {
        
                console.log(error);
        
            }
    
        });
        function downloadVideo() {}
        //photo
            bot.on('message', async message => {
    
                try {
                    if (!fs.existsSync(dirPathImg)) {
                        fs.mkdirSync(dirPathImg, { recursive: true });
                    }
                    try {
                        
                        const resultData = {
                            link: `data:${message}`,
                            type: "video",
                            progressInfoId: idProgress
                        };
                        let responseResult = await fetch('http://localhost:3000/result/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(resultData)
                        }); 
                        if(responseResult.ok) {
                            bot.sendMessage(chatId, 'Отлично! Обрабатываю результаты…');
                        }
                        bot.sendPhoto(chatId, downloadedImgUrl);
                    } catch (error) {
                        console.error(error);
                    }
                    
                    setTimeout(() => {
                        const status = getStatus(idProgress);
                        if(status!='inProgress' && status=='done'){
                            bot.sendMessage(chatId, 'Поздравляю!  Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');
    
                        } else {
                            bot.sendMessage(chatId,'Твоя цель была отклонена, пожалуйста попробуй снова!')
                        }
                    }, 1000 * 60); // Например, отправляем через 5 минут
                }
    
            
                
                catch(error) {
            
                    console.log(error);
            
                }
        
            });
}

module.exports = {downloadRes};