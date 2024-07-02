import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from "../common/header/Header";
import GoalsList from "./goals-list/GoalsList";
import AppInfo from "./app-info/AppInfo";
import AppFilter from "./app-filter/AppFilter";
import { useEffect } from 'react';


function MainPage(props) {
    useEffect(() => {
        document.title = 'Главная';
      }, []);
    function onFilterSelected(name) {
        props.onFilterSelect(name);
    }
    let doneGaols = props.data.filter(item=>item.status == "done");
    
    return (
        <div>
            <Header>
                <AppInfo doneGoals={doneGaols.length} goals={props.data.length}/>
            </Header>
            <Container>
                <Row>
                    <Col>
                        <AppFilter onFilterSelect={onFilterSelected} />
                        <GoalsList data={props.data}></GoalsList>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}



export default MainPage;