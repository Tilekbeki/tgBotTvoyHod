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
                const responseImg = await axios.get(`http://localhost:3000/result/28`);
                const { data } = responseImg;
                setImageSrc(data.link); // Устанавливаем данные изображения в состояние
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);

    const [selectedStatus, setSelectedStatus] = useState(status);
    const [selectedAdmin, setSelectedAdmin] = useState('');
    const [comment, setComment] = useState('');
    const [prize, setPrize] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Results = await myBackEnddd.getResults(id);
                const Prize = await myBackEnddd.getPrize(id);
                setResults(Results);
                setPrize(Prize);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);

    const createNewPrize = async () => {
        try {
            const response = await axios.post('http://localhost:3000/prize/', {
                type: 'link',
                content: 'Текст призового предложения от админа'
            });
            console.log(response.data);
            alert('Новый приз успешно создан!');
        } catch (error) {
            console.error('Ошибка при создании нового приза:', error);
            alert('Произошла ошибка при создании нового приза.');
        }
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
            option.value === currentStatus ?
                <option value={option.value} key={option.value} selected>{option.label}</option> :
                <option value={option.value} key={option.value}>{option.label}</option>
        );
    };

    const displayImages = () => {
        console.log(imageSrc)
        return (
            <div>
                <ImageDisplay imageUrl={imageSrc} />
            </div>
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
                    {prize ? (
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
