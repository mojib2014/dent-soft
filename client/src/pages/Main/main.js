import React, {Component} from "react";
import Login from "../../components/Login";
import { Col, Row, Container,Jumbotron } from "reactstrap";


class Main extends Component {

    render() {
        return (
            <Container fluid> 
                <Jumbotron>
                    <Row>
                       <Col size="md-6">
                            <div className="intro">
                                <p>Great William is Watching You!</p>
                            </div>
                       </Col>
                       <Col size="md-6">
                            <div className="Login">
                                <Login />
                            </div>
                       </Col> 
                    </Row>
                </Jumbotron>
            </Container>
        );
    }
}

export default Main;