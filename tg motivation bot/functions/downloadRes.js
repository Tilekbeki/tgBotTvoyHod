const deleteEntities = require('./deleteEntity');
const { getStatus } = require('./getStatus');
const { getQuiz } = require('./getQuiz');
const { sendMail } = require('./sendMail');
const fs = require('fs');
const sharp = require('sharp');
const { sendPrize } = require('./sendPrize');

function downloadRes(bot, chatId, idProgress, goalId, app) {
    const dirPathImg = './media/' + chatId + idProgress + '/image';
    let downloadedImgUrl;

    async function askForType(app) {
        bot.sendMessage(chatId, 'Ваш результат фото или видео? Если фото напишите ФОТО, если видео то ВИДЕО');
        bot.once('message', async (msg) => {
            if (!msg.text) {
                bot.sendMessage(chatId, 'Пожалуйста, выберите и отправьте фото или видео');
                return askForType(app);
            }
            const text = msg.text.toLowerCase();

            if (text === 'фото') {
                bot.sendMessage(chatId, 'Отправьте фото для обработки');
                downloadPhoto();
            } else if (text === 'видео') {
                bot.sendMessage(chatId, 'Отправьте ссылку в общем доступе для обработки видео (например, ссылка на ютуб ролик)');
                downloadVideo();
            } else {
                bot.sendMessage(chatId, 'Пожалуйста, выберите и отправьте фото или видео');
                askForType(app);
            }
        });
        app.get('/api/finish/:status/:chatId', async (req, res) => {
            const status = req.params.status;
            const chatId = req.params.chatId;
            
            if (status === 'done') {
                //clearInterval(checkStatusInterval);
                bot.sendMessage(chatId, 'Поздравляю! Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');
                sendPrize(bot, goalId, chatId);
            } 
            if (status === 'inProgress') {
                const response = await fetch(`http://localhost:3000/progressinfo/${idProgress}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    //clearInterval(checkStatusInterval);
                    bot.sendMessage(chatId, 'Результат не понравился Администратору! Пожалуйста, отправь снова');
                    bot.sendMessage(chatId, `Коментарий админа: \n ${data.comment}`);
                    askForType(app);
                }
                
            } if (status !== 'inProgress' && status !== 'done') {
                bot.sendMessage(chatId, 'Твоя цель была отклонена, всего хорошего!');
                askForType(app);
                bot.sendMessage(chatId, `Статус ${status}`);
            }
        });
    }

    async function downloadPhoto() {
        bot.once('message', async (msg) => {
            if (msg.photo && msg.photo.length > 0) {
                try {
                    if (!fs.existsSync(dirPathImg)) {
                        fs.mkdirSync(dirPathImg, { recursive: true });
                    }

                    const highestQualityPhoto = msg.photo[msg.photo.length - 1];
                    const photoPath = await bot.downloadFile(highestQualityPhoto.file_id, dirPathImg);
                    downloadedImgUrl = `./${photoPath}`;

                    const jpegPath = downloadedImgUrl.replace(/\.[^/.]+$/, ".jpeg");

                    await sharp(downloadedImgUrl)
                        .jpeg()
                        .toFile(jpegPath);

                    const imageBuffer = fs.readFileSync(jpegPath);
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

                    if (responseResult.ok) {
                        bot.sendMessage(chatId, 'Отлично! Обрабатываю результаты…');
                        let info = `пользователь с айди: ${chatId} отрпавил результаты с целью ${goalId} и progressinfoId ${idProgress}`;
                        sendMail(bot, chatId,  info);
                    }

                    // bot.sendPhoto(chatId, jpegPath);
                   
                    // const checkStatusInterval = setInterval(async () => {
                        
                    //     const status = await getStatus(bot, idProgress);
                        
                    // }, 1000 * 60); // Проверяем статус каждую минуту

                } catch (error) {
                    console.error(error);
                    bot.sendMessage(chatId, 'Произошла ошибка, попробуйте снова.');
                    downloadPhoto();
                }
            } else {
                bot.sendMessage(chatId, 'Пожалуйста, отправьте фотографию.');
                downloadPhoto();
            }
        });
    }

    async function downloadVideo() {
        bot.once('message', async (msg) => {
            const urlPattern = /^(https?:\/\/)?((w{3}\.)?)youtube|youtu\.be|vimeo|dailymotion|vk\.com|facebook\.com|twitter\.com|instagram\.com\/.+$/;
            if (msg.text && urlPattern.test(msg.text)) {
                try {
                    if (!fs.existsSync(dirPathImg)) {
                        fs.mkdirSync(dirPathImg, { recursive: true });
                    }

                    const resultData = {
                        link: `${msg.text}`,
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

                    if (responseResult.ok) {
                        bot.sendMessage(chatId, 'Отлично! Обрабатываю результаты…');
                        let info = `пользователь с айди: ${chatId} отрпавил результаты с целью ${goalId} и progressinfoId ${idProgress}`;
                        sendMail(bot, chatId,  info);
                    }

                    // bot.sendPhoto(chatId, downloadedImgUrl);

                    // const checkStatusInterval = setInterval(async () => {
                    //     const status = await getStatus(bot, idProgress);
                    //     if (status === 'done') {
                    //         clearInterval(checkStatusInterval);
                    //         bot.sendMessage(chatId, 'Поздравляю! Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');
                    //         sendPrize(bot, goalId, chatId);
                    //     } else {
                    //         bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!');
                    //     }
                    // }, 1000 * 60); // Проверяем статус каждую минуту

                } catch (error) {
                    console.error(error);
                    bot.sendMessage(chatId, 'Произошла ошибка, попробуйте снова.');
                    downloadVideo();
                }
            } else {
                bot.sendMessage(chatId, 'Пожалуйста, отправьте корректную ссылку на видео.');
                downloadVideo();
            }
        });
    }

    askForType(app);
}

module.exports = { downloadRes };
