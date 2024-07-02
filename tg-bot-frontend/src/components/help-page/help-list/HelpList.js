import React, { useState, useEffect } from 'react';
import MyBackEnd from "../../../services/botServices";
function HelpList() {
    const [helps, setHelps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHelps = async () => {
            try {
                const myBackEndInstance = new MyBackEnd(); // Создаем экземпляр MyBackEnd
                const response = await myBackEndInstance.getHelps(); // Получаем список помощи
                console.log(response)
                setHelps(response);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load helps:', error);
                setLoading(false);
            }
        };

        fetchHelps();
    }, []);

    const toggleHelped = async (helpId) => {
        try {
            const myBackEndInstance = new MyBackEnd(); // Создаем экземпляр MyBackEnd
            const updatedHelp = helps.find(help => help.id === helpId);
            updatedHelp.Helped =!updatedHelp.Helped; // Инвертируем значение Helped

            await myBackEndInstance.updateHelp(helpId, updatedHelp); // Обновляем статус помощи на сервере
            setHelps(helpsWithout(helpId)); // Обновляем локальный список без измененного элемента
            alert('Help status updated successfully');
        } catch (error) {
            console.error('Failed to update help status:', error);
        }
    };

    const helpsWithout = (idToRemove) => {
        return helps.filter(help => help.id!== idToRemove);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Help List</h1>
            <ul>
                {helps.map(help => (
                    <li key={help.id}>
                        nickname TG:@{help.nickName} Статус:{help.Helped? 'Помогли' : 'Не помогли'} Описание: {help.Description}
                        <button onClick={() => toggleHelped(help.id)}>Помочь</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HelpList;