import React from "react";
import Nav from "../../components/Nav";
import Login from "../../components/Login";

class Main extends Component {
    state = {
        username:"",
        password:""
    };

    render() {
        return (
            <Container fluid> 
                <Nav /> 
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