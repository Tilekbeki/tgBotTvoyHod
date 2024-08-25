const nodemailer = require('nodemailer');
function sendMail(bot,chatId, info) {
    bot.sendMessage(chatId, 'Письмо успешно отправлено: ');
    const transporter = nodemailer.createTransport({
        service: 'gmail', // или другой SMTP-сервис
        auth: {
            user: 'tilekshannel@gmail.com', // Ваш email
            pass: 'fmhn vncv rwmz ljyr' // Ваш пароль (или App Password)
        }
    });

    const mailOptions = {
        from: 'tilekshannel@gmail.com', // Ваш email
        to: 'dvigaitvoyhod@yandex.ru', // Получатель
        subject: 'Сообщение от Telegram-бота',
        text: info
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Ошибка при отправке письма: ' + error.message);
        } else {
            console.log('Письмо успешно отправлено: ' + info.response);
        }
    });
 }

module.exports = {sendMail};
