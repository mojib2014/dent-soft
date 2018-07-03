import React from "react";
import API from "../../utils/API";
// import FindInfo from "../../components/FindInfo";
// import Nav from "../../components/Nav";
// import { Col, Row, Container, Table, Button, Form, FormGroup, Label, Input} from "reactstrap";
import { Col, Row, Container} from "reactstrap";

class Patient extends React.Component {

    componentDidMount() {
        // API.getCookie()
        //    .then( (result) => {
        //        console.log(result);
        //    }).catch (err=>{console.log(err)})

        //get user id from session storage and lookup user info in db
    }

    render(){
        return(
            <Container fluid>
                <Row className="profile">
                    <Col md="4"> 
                    <img src="https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCPHDwdPiseeqRSILdmNhcmRfcGhvdG8qKDVmMzA0NzY5NzgwYzlhNmRlMWQ2OTU4MTdkMTdhMmMyOWZkZGY4MDIwAfxasVgm4AGxpvb4O_L-r52SqRtd?sz=200"/>
                    </Col>

                    <Col md="8"> 
                    Profile Information
                    </Col>
                </Row>
                <Row className="notifications">
                    <Col md="4"> 
                    Files/Reports
                    </Col>
                    
                    <Col md="8"> 
                    Dentist Notes
                    </Col>
                </Row>
                <Row className="appointments">
                    <Col md="4"> 
                    Current Booking
                    </Col>
                    
                    <Col md="8"> 
                    Make a Booking
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Patient;