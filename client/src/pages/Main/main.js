import React, {Component} from "react";
import Login from "../../components/Login";
import { Col, Row, Container } from "reactstrap";


class Main extends Component {
    state = {
        username:"",
        password:""
    };

    render() {
        return (
            <Container fluid> 
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
            </Container>
        );
    }
}

export default Main;