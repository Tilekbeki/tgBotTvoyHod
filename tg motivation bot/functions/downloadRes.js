const deleteEntities = require('./deleteEntity');
const { getStatus } = require('./getStatus');
const {getQuiz}  = require('./getQuiz');
const fs = require('fs');
const sharp = require('sharp');  // Подключение библиотеки sharp
const { sendPrize } = require('./sendPrize');

function downloadRes(bot, chatId, idProgress, goalId) {
    const dirPathImg = './media/' + chatId + idProgress + '/image';
    let downloadedImgUrl;

    async function askForType() {
        bot.sendMessage(chatId, 'Ваш результат фото или видео? Если фото напишите ФОТО, если видео то ВИДЕО');
        bot.once('message', async (msg) => {
            const text = msg.text.toLowerCase();
          
            if (text === 'фото') {
                bot.sendMessage(chatId, 'Отправьте фото для обработки');
                downloadPhoto();
            } else if (text === 'видео') {
                bot.sendMessage(chatId, 'Отправьте ссылку в общем доступе для обработки видео (например ссылка на ютуб ролик)');
                downloadVideo();
            } else {
                bot.sendMessage(chatId, 'Пожалуйста, выберите и отправьте фото или видео');
                askForType();
            }
        });
        getQuiz(bot, chatId, goalId, deadline, progressinfoId, false);
    }

    async function downloadPhoto() {
        bot.once('photo', async (img) => {
            try {
                if (!fs.existsSync(dirPathImg)) {
                    fs.mkdirSync(dirPathImg, { recursive: true });
                }

                // Используйте последнее изображение из массива, которое обычно самое высокое по качеству
                const highestQualityPhoto = img.photo[img.photo.length - 1];
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
                }

                bot.sendPhoto(chatId, jpegPath);

                const checkStatusInterval = setInterval(async () => {
                    const status = await getStatus(bot, idProgress);
                    if (status === 'done') {
                        clearInterval(checkStatusInterval);
                        bot.sendMessage(chatId, 'Поздравляю! Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');
                        sendPrize(bot, goalId, chatId);
                    } else {
                        bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!');
                    }
                }, 1000 * 60); // Проверяем статус каждую минуту

            } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, 'Произошла ошибка, попробуйте снова.');
                downloadPhoto();
            }
        });
    }

    async function downloadVideo() {
        bot.once('message', async (message) => {
            try {
                if (!fs.existsSync(dirPathImg)) {
                    fs.mkdirSync(dirPathImg, { recursive: true });
                }

                const resultData = {
                    link: `data:${message.text}`,
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
                }

                bot.sendPhoto(chatId, downloadedImgUrl);

                const checkStatusInterval = setInterval(async () => {
                    const status = await getStatus(bot, idProgress);
                    if (status === 'done') {
                        clearInterval(checkStatusInterval);
                        bot.sendMessage(chatId, 'Поздравляю! Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок.\nПродолжай в том же духе - достигай целей и становись лучше!»');
                        sendPrize(bot, goalId, chatId);
                    } else {
                        bot.sendMessage(chatId, 'Твоя цель была отклонена, пожалуйста попробуй снова!');
                    }
                }, 1000 * 60); // Проверяем статус каждую минуту

            } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, 'Произошла ошибка, попробуйте снова.');
                downloadVideo();
            }
        });
    }

    askForType();
}

module.exports = { downloadRes };
