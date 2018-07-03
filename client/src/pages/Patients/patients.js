import React from "react";
import API from "../../utils/API";
// import FindInfo from "../../components/FindInfo";
// import Nav from "../../components/Nav";
// import { Col, Row, Container, Table, Button, Form, FormGroup, Label, Input} from "reactstrap";
import FindInfo from "../../components/FindInfo";
import { Col, Row, Container, Table, Button, Form, FormGroup, Label, Input} from "reactstrap";
import "./patients.css";

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
                    <Col md="4" className="InfoBoxLeft"> 
                    <h2>Marlon Jovez</h2>
                    <img src="https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCPHDwdPiseeqRSILdmNhcmRfcGhvdG8qKDVmMzA0NzY5NzgwYzlhNmRlMWQ2OTU4MTdkMTdhMmMyOWZkZGY4MDIwAfxasVgm4AGxpvb4O_L-r52SqRtd?sz=200"/>
                    </Col>

                    <Col md="7" className="InfoBoxRight"> 
                    <h2>Profile Information</h2>
                    </Col>
                </Row>
                <Row className="notifications">
                    <Col md="4" className="InfoBoxLeft"> 
                    <h2>Files/Reports</h2>
                    </Col>
                    
                    <Col md="7" className="InfoBoxRight"> 
                    <h2>Dentist Notes</h2>
                    </Col>
                </Row>
                <Row className="appointments">
                    <Col md="4" className="InfoBoxLeft"> 
                    <h2>Current Booking</h2>
                    </Col>
                    
                    <Col md="7" className="InfoBoxRight"> 
                    <h2>Make a Booking</h2>
                    
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Patient;