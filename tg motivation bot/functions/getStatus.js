async function getStatus(bot, idProgress) {
    const responseForStatus = await fetch(`http://localhost:3000/progressinfo/${idProgress}`);

    if (!responseForStatus.ok) {
        throw new Error(`HTTP error status: ${responseForStatus.status}`);
    }

    // Получаем тело ответа и преобразуем его в JSON
    const data = await responseForStatus.json();

    // Извлекаем поле status из тела ответа
    const status = data.status;

    console.log('Status:', status);
    return status;
}

module.exports = {getStatus};