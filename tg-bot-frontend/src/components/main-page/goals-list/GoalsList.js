import "./GoalsList.scss";
import GoalItem from "../goal-item/goalItem";
import { useState, useEffect } from "react";

function GoalsList(props) {
  const [mas, setMas] = useState(props.data);

  useEffect(() => {
    setMas(props.data);
  }, [props.data]);

  let boolcheck = props.data ? true: false;

  if (boolcheck) {
    return (
      <div className="goals-list">
        {
        mas.map((item) => (
          <GoalItem key={item.id} id={item.id} status={item.status} name={item.goalName} user={item.userName} goalId={item.goalId} userId={item.userId}/>
        ))
        }
      </div>
    );
  }
  
}

export default GoalsList;
