// Функция для отправки категорий пользователю
function getCategories(bot, chatId) {
    fetch('http://localhost:3000/category')
        .then(response => response.json())
        .then(data => {
            const inlineKeyboard = data.map(item => {
                return [{ text: item.name, callback_data: item.name }];
            });
            const replyMarkup = {
                inline_keyboard: inlineKeyboard
            };

            // Отправляем сообщение с кнопками категорий
            bot.sendMessage(chatId, 'Категории:', {
                reply_markup: replyMarkup
            })
            .catch(error => console.error('Ошибка при отправке сообщения с категориями:', error));
        })
        .catch(error => console.error('Ошибка при получении данных категорий:', error));
}

module.exports = {getCategories};