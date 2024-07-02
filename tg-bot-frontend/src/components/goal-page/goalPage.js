import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyBackEnd from '../../services/botServices';
import { Link } from 'react-router-dom';
import ImageDisplay from '../imageUrl/ImageDisplay';
function GoalPage() {
        const myBackEnddd = new MyBackEnd();

    const location = useLocation();
    const { id, name, user, status, goalId, userId } = location.state;
    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        document.title = name;
        const fetchImage = async () => {
            try {
              const response = await axios.get('http://localhost:3000/files/1.jpg');
              setImageSrc(response.data.url); // Установите URL файла из ответа сервера
            } catch (error) {
              console.error('Error fetching image:', error);
            }
          };
      
          fetchImage();
        }, []);

    const chatId = userId;
    const token = '6738232005:AAEIQJsUxGAnCieXZeszbdOtpVmMlHQ40QM';
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [comment, setComment] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        document.title = name;
    }, []);

    const [prize, setPrize] = useState(null); // Состояние для хранения информации о призе
    const [results, setResults] = useState([]); // Состояние для хранения результатов

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Results = await myBackEnddd.getResults(id);
                const Prize = await myBackEnddd.getPrize(id);
                setResults(Results);
                setPrize(Prize);
                const response = await axios.get('http://localhost:3000/save-files/2019712807', { responseType: 'arraybuffer' });
                const arrayBuffer = new Uint8Array(response.data).buffer;
                const blob = new Blob([arrayBuffer], { type: 'image/jpg' }); // Измените тип на соответствующий вашему изображению
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    const createNewPrize = async () => {
        try {
            const response = await axios.post('http://localhost:3000/prize/', {
                type: 'link', // Здесь можно задать тип приза, который выбрал админ
                content: 'Текст призового предложения от админа'
            });
            console.log(response.data);
            alert('Новый приз успешно создан!');
        } catch (error) {
            console.error('Ошибка при создании нового приза:', error);
            alert('Произошла ошибка при создании нового приза.');
        }
    };

    const displayImages = () => {
        console.log(imageUrl)
        return  (
            <div>
                <ImageDisplay imageUrl={imageSrc} />
            </div>
        );
    };
    const approveGoal = async () => {
                try {
                    const currentTime = new Date().toISOString();
                    const response = await axios.patch(`http://localhost:3000/progressinfo/${id}`, {
                        status: selectedStatus,
                        comment: comment,
                        admin: selectedAdmin,
                        dateChecked: currentTime
                    });
                    console.log(response.data);
                    alert('Статус обновлен!');
                    // let url;
                    // if (status=="active" && selectedStatus == "inProgress") {
                    //     console.log('условие 1')
                    //     url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent('Админ проверил цель, ждите дальнейшней инструкции...')}`;
                    // }
                    // if (status=="inProgress" && selectedStatus=="done") {
                    //     console.log('условие 2')
                    //     url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent('Поздравляю!  Результат, достойный похвал! 🥳 Показал целеустремленность и заслужил подарок!')}`;
                    // }
                    // if (status=="active" && selectedStatus == "canceled") {
                    //     console.log('условие 3');
                    //     url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent('Твоя цель была отклонена, пожалуйста попробуй снова')}`;
                    // }
                    // if (status=="done" && selectedStatus=="done") {
                    //     console.log('условие 4')
                    //     url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent('Твоя цель была отклонена, пожалуйста попробуй снова!')}`;
                    // }
                    // const response2 = await fetch(url);
                    // const data3 = await response2.json();
                } catch (error) {
                    console.error('Ошибка при обновлении статуса:', error);
                    alert('Произошла ошибка при обновлении статуса.');
                }
            };
    const generateOptions = (currentStatus) => {
                return [
                    { value: 'active', label: 'Активный' },
                    { value: 'inProgress', label: 'В процессе' },
                    { value: 'canceled', label: 'Отклоненный' },
                    { value: 'done', label: 'Законченный' }
                ].map(option => 
                    option.value === currentStatus? 
                        <option value={option.value} selected>{option.label}</option> :
                        <option value={option.value}>{option.label}</option>
                );
            };
    return (
        <div>
            <Container>
                <Col>
                    <Row>
                        <h1>Подробности цели</h1>
                        <div>ID: {id}</div>
                        <div>goalId: {goalId}</div>
                        <div>Название: {name}</div>
                        <div>Пользователь: {user}</div>
                        <select name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            {generateOptions(selectedStatus)}
                        </select>
                        <select name="admin" value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)}>
                            <option value="Тилек" selected>Тилек</option>
                            <option value="Влад">Влад</option>
                        </select>
                        <div>Текущий статус: {status}</div>
                        <div><textarea name="comment" id="commentAdmin" onBlur={(e) => setComment(e.target.value)}></textarea></div>
                        <div><button onClick={approveGoal}>ОДОБРИТЬ</button></div>
                        <div><button>ОТКЛОНИТЬ</button></div>
                        <div><hr /></div>
                    </Row>
                </Col>
            </Container>
            <Container>
                <Row>
                    <h2>Информация о призе</h2>
                    {prize? (
                        <div>
                            <p>Имя пользователя: {prize.userName}</p>
                            <p>Имя приза: {prize.prizeName}</p>
                            <p>Тип приза: {prize.prizeType}</p>
                        </div>
                    ) : (
                        <div>
                            <h3>Приз не найден. Администратору необходимо создать новый приз.</h3>
                            <Link to={`/create-prize/${goalId}`}>
                                <button onClick={createNewPrize}>Создать новый приз</button>
                            </Link>
                        </div>
                    )}
                </Row>
                <Row>
                    <h2>Результаты</h2>
                    {displayImages()}
                </Row>
            </Container>
        </div>
    );
}

export default GoalPage;
