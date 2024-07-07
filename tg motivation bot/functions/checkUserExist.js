const {createGoal}  = require('./createGoal');
async function checkUserExist(bot, userChatId, username, category) {
    try {
        const response = await fetch(`http://localhost:3000/user/${userChatId}`);
        const userData = await response.json();

        if (userData.chatId) {
            createGoal(bot, userChatId, category);
        } else {
            let user = {
                chatId: userChatId,
                name: username
            }
            let response = await fetch(`http://localhost:3000/user/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
              });
              if (response.ok) {
                // Если статус ответа в диапазоне 200-299, это означает, что запрос выполнен успешно
                console.log("Пользователь успешно создан");
                createGoal(bot, userChatId, category);
                // Теперь можно обработать ответ сервера, если это необходимо
                let userData = await response.json(); // Предположим, что сервер возвращает информацию о созданном пользователе в формате JSON
                // console.log(userData); // Вывод информации о созданном пользователе
            } else {
                // Если статус ответа не в диапазоне 200-299, это означает, что возникла ошибка
                console.error("Ошибка при создании пользователя:", response.status);
                // Можно также обработать тело ответа, чтобы получить дополнительную информацию об ошибке
                let errorMessage = await response.text();
                console.error(errorMessage); // Вывод сообщения об ошибке
            }
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
        // bot.sendMessage(2019712807, `Произошла ошибка при проверке пользователя`);
    }
}

module.exports = {checkUserExist};