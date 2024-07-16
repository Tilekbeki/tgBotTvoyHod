import './goal-item.scss';
import { Link } from 'react-router-dom';
const goalItem = (props) => {
    

    const {id,name,user,status,goalId,userId,descr} = props;/*приняли все пропсы а также метод*/
        let classNamesMarked = "goal-item";
        
    return (
        <li className={classNamesMarked}>
            
           <div>id: {id}</div>
           <div>цель: {name}</div>
           <div>Статус: {status}</div>
           <div>Пользователь: {user}</div>
           <div>goalId: {goalId}</div>
           <div>userId {userId}</div>
          {/* Используем компонент Link для перехода на страницу /goal и передачи пропсов */}
          <Link to="/goal" state={{ id,  status,user,name,goalId,userId, descr }}>перейти</Link>
        </li>
    )
}

export default goalItem;