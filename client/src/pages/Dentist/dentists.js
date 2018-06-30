import React from "react";
import "./dentists.css"
import FindInfo from "../../components/FindInfo";
import Photo from "../../components/Photo";
import { Col, Row, Container, Table, Button, FormGroup, Form, Label, Input} from "reactstrap";


class Dentist extends React.Component{
    



    render(){
        return(
            <div>
            <div className="dentistInfo container">
                <Row className = "dentistR1">
                    <Col md="4" xs="4">
                    <div className="photoDiv">
                        {/* <Upload /> */}
                        <Photo />
                    </div>
                     
                        {/* <img className="docPic" src="http://imgx.xiawu.com/xzimg/i4/i3/14932021301911074/T12qp5XyJcXXXXXXXX_!!0-item_pic.jpg" alt="William"/> */}
                    </Col>
                    <Col md="8" xs="8">
                 
                        <div>Great Dr.William is me! Wa hahahahahahahah!!!</div>
                    </Col>
                </Row>
                <Row className="dentistR2">
                    <Col md="7" xs="7">
                    {/* calendar div */}
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
                    <Col className="patientCard" md="5" xs="5">
                        <Form inline>
                            <Label for="searchPatients">Patient's Phone:</Label>
                     
                            <Input type="text" placeholder="Phone Number" />
                            <Button color="primary"  size="sm" ><i className="fas fa-search"></i></Button>
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