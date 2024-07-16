import "./goalPage.scss";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyBackEnd from '../../services/botServices';
import ImageDisplay from '../imageUrl/ImageDisplay';
import CreatePrize from '../create-prize/createPrize';

function GoalPage() {
    const myBackEnddd = new MyBackEnd();
    const location = useLocation();
    const { id, name, user, status, goalId, userId,descr } = location.state;
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        document.title = name;

        const fetchImage = async () => {
            try {
                const responseImg = await axios.get(`http://localhost:3000/result/${id}`);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Prize = await myBackEnddd.getPrize(id);
                setPrize(Prize);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchData();
    }, []);



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
                <option defaultValue={option.value} key={option.value}>{option.label}</option> :
                <option value={option.value} key={option.value}>{option.label}</option>
        );
    };

    const displayImages = () => {
        if (!imageSrc) {
            return(
                <div>*результатов нет.</div>
            )
        } else {
            return (
                <div>
                    <ImageDisplay imageUrl={imageSrc} />
                </div>
            );
        }
        
    };

    return (
        <div>
            <Container>
                <Col>
                    <Row>
                    <style>{'body { background:#4d5bbe;}'}</style>
                        <div className='goal-page'>
                            <div className="goal-card">
                                <div>ID: {id}</div>
                                <div>goalId: {goalId}</div>
                                <div>Название: {name}</div>
                                <div>Пользователь: {user}</div>
                                <div>Текущий статус: {status}</div>
                                <div>Описание: {descr}</div>
                                <div>Выберите статус:</div>
                                <select name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                    {generateOptions(selectedStatus)}
                                </select>
                                <div>Выберите админа:</div>
                                <select name="admin" value={selectedAdmin} onChange={(e) => setSelectedAdmin(e.target.value)}>
                                    <option defaultValue="Тилек">Тилек</option>
                                    <option value="Влад">Влад</option>
                                </select>
                                <div><textarea name="comment" id="commentAdmin" placeholder="Ваш комментарий" onBlur={(e) => setComment(e.target.value)}></textarea></div>
                                <div><button onClick={approveGoal}>ОТПРАВИТЬ</button></div>
                                <div></div>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Container>
            <Container>
                <div className="goal-info">
                    <Row>
                        <h2>Результаты</h2>
                        {displayImages()}
                    </Row>
                    <Row>
                        <h2>Информация о призе</h2>
                        {prize ? (
                            <div>
                                <p>приз: <ImageDisplay imageUrl={prize.prizeName} /></p>
                                <p>Тип приза: {prize.prizeType}</p>
                            </div>
                        ) : (
                            <div>
                                <p>*Приз не найден. Администратору необходимо создать новый приз.</p>
                                <CreatePrize goalId={goalId} userId={userId}></CreatePrize>
                            </div>
                        )}
                    </Row>
                </div>
                
            </Container>
        </div>
    );
}

export default GoalPage;
