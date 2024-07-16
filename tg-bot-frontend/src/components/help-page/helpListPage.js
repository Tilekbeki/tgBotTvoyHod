import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../common/header/Header';
import HelpList from './help-list/HelpList';
import { useEffect } from 'react';
function HelpPage() {
    useEffect(() => {
        document.title = 'Страница помощи';
      }, []);
    return(
        <div>
            
            <Header/>
            <Container>
          <Row>
            <Col>
            <HelpList />
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default HelpPage;