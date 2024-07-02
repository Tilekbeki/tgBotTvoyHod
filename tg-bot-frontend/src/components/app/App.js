import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelpPage from '../help-page/helpListPage';
import MainPage from '../main-page/mainPage';
import GoalPage from '../goal-page/goalPage';
import MyBackEnd from '../../services/botServices';
import MotivationSurvey from '../quiz-page/quizPage';
function App() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]); // Инициализируем allData как пустой массив
  const myBackEnddd = new MyBackEnd();
  const [filter, setFilter] = useState('all');

  function onFilterSelect(fil) {
    setFilter(fil);
    onSort(fil);
  }

  function onSort(status) {
    let sortedData;

    switch (status) {
      case 'all':
        sortedData = [...allData]; // Копируем исходный массив, так как "all" должен показывать все данные
        break;
      case 'canceled':
        sortedData = allData.filter(item => item.status === 'canceled');
        break;
      case 'done':
        sortedData = allData.filter(item => item.status === 'done');
        break;
      case 'inProgress':
        sortedData = allData.filter(item => item.status === 'inProgress');
        break;
      default:
        sortedData = allData; // По умолчанию показываем все данные
    }

    setData(sortedData); // Обновляем состояние с отсортированными данными
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await myBackEnddd.getGoalsProgressInfo();
        setData(initialData);
        setAllData(initialData); // Используем setAllData для обновления allData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
  
    
    fetchData();
  }, []);

  

  

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage data={data} onFilterSelect={onFilterSelect} />} />
          <Route path="/helpList" element={<HelpPage />} />
          <Route path="/goal" element={<GoalPage />} />
          <Route path="/quiz" element={<MotivationSurvey />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;