import './app-info.scss';

const AppInfo = ({goals,doneGoals}) => {
    return (
        <div className="app-info">
            <div>Всего целей: <span>{goals}</span></div>
            <div>Завершенных: <span>{doneGoals}</span></div>
        </div>
    );
}

export default AppInfo;