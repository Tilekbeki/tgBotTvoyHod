import React, { useState } from 'react';
import './quizPage.scss';

const MotivationSurvey = () => {
    const [formData, setFormData] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Функция для получения параметров из URL
    const getParamsFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get('userId');
        const goalId = params.get('goalId');
        return { userId, goalId };
    }

    const handleInputChange1 = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange2 = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange3 = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange4 = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange5 = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }
        setIsSubmitted(true);
        try {
            let formattedData = Object.entries(formData).map(([key, value]) => `${key}:${value}`).join(',');
            // Получаем параметры из URL
            const { userId, goalId } = getParamsFromUrl();
            const response = await fetch(`http://localhost:3000/quiz?userId=${userId}&goalId=${goalId}`, {
                method: 'POST',
                body: JSON.stringify({
                    goalId: +goalId,
                    answers: formattedData,
                    userId: +userId,
                    dateFilled: new Date().toISOString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                setShowSuccessMessage(true);
            } else {
                throw new Error('Ошибка при отправке данных.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="content">
            {!isSubmitted? ( // Проверяем, была ли форма отправлена
                <div className="form">
                    <h1>Опросник мотивации на достижение цели⚡️</h1>
                    <form onSubmit={handleSubmit}>
                    <p><label htmlFor="question1">Вопрос 1: Что будет, когда ты достигнешь цели?</label></p>
                    <input type="text" id="question1" name="question1" onChange={handleInputChange1} required /><br /><br />

                    <p><label htmlFor="question2">Вопрос 2: Насколько ты далек от цели в данный момент?</label></p>
                    <input type="text" id="question2" name="question2" onChange={handleInputChange2} required /><br /><br />
                    <p><label htmlFor="question3">Вопрос 3: Насколько сильное твое желаение достичь цели?</label></p>
                    <input type="text" id="question3" name="question3" onChange={handleInputChange3} required /><br /><br />

                    <p><label htmlFor="question4">Вопрос 4: Что сделаешь после того как достигнешь?</label></p>
                    <input type="text" id="question4" name="question4" onChange={handleInputChange4} required /><br /><br />

                    <p><label htmlFor="question5">Вопрос 5: Веришь в себя?</label></p>
                    <input type="text" id="question5" name="question5" onChange={handleInputChange5} required /><br /><br />
                    <button type="submit">Отправить</button>
                    </form>
                </div>
            ) : (
                showSuccessMessage && (
                    <div className="go-to">
                        <h1>Подздравляю Ты прошел опрос!</h1>
                        <a href="https://t.me/ProDVIGok_bot">вернутся к боту</a>
                    </div>
                )
            )}
        </div>
    );
};

export default MotivationSurvey;
