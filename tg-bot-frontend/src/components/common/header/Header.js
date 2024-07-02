import "./Header.scss"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Header(props) {
    return (
      <div className="header">
       АДМИН ПАНЕЛЬ ПРОЕКТА «ДВИГАЙ!⚡️»
       <Container>
        <Row>
          <Col>
          {props.children}
          </Col>
        </Row>
       </Container>
      </div>
    );
  }
  
  export default Header;