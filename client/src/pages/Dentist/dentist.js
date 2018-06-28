import React from "react";
import FindInfo from "../../components/FindInfo";
import { Col, Row, Container, Table, Button, Form, FormGroup, Label, Input} from "reactstrap";

class Dentist extends React.Component{
    render(){
        return(
            <div>
            <div className="dentistInfo container">
                <Row className = "dentistR1">
                    <Col md="4" xs="4">
                        <img />
                    </Col>
                    <Col md="8" xs="8">
                        <div>Great Dr.William is me!</div>
                    </Col>
                </Row>
                <Row className="dentistR2">
                    <Col md="7" xs="7">
                        <Table>
                        
                            <thead>
                            <tr>
                                <th>date</th>
                                <th>date</th>
                                <th>date</th>
                                <th>date</th>
                                <th>date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>date</td>
                                <td>date</td>   
                                <td>date</td>
                                <td>date</td>
                            </tr>
                            <tr>
                                <td>date</td>
                                <td>date</td>   
                                <td>date</td>
                                <td>date</td>
                            </tr>
                            <tr>
                                <td>date</td>
                                <td>date</td>   
                                <td>date</td>
                                <td>date</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="5" xs="5">
                        <Form inline>
                            <Label for="searchPatients">Patient's Phone:</Label>
                            <Input type="text" placeholder="Phone Number" />
                            <Button>Search</Button>
                        </Form>
                        <div>
                            <FindInfo />
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
        )
    }
}

export default Dentist;