import "./app-filter.scss"

const AppFilter = (props) => {

    const buttonsData = [
        {name: 'all', label: 'Все'},
        {name: 'inProgress', label: 'В процессе'},
        {name: 'canceled', label: 'Отклоненные'},
        {name: 'done', label: 'Завершенные'},
    ]

    const buttons = buttonsData.map(({name,label})=> {
    const active = props.filter === name;//if props.filter ===name    
    const clazz = active? 'btn-light' : 'btn-outline-danger'//переменная которая содержит строчку класа
    return (
            <button 
            className={`btn ${clazz}`}
            type="button"
            key={name} 
            onClick={()=>props.onFilterSelect(name)}>
                
                {label}
            </button>
        )
    })
    return (
        <div className="btn-group">
            {buttons}
        </div>
    )

}

export default AppFilter;