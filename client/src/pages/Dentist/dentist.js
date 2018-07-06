import React from "react";
import "./dentist.css";
import FindInfo from "../../components/FindInfo";
import Photo from "../../components/Photo";
// import Footer from "../../components/Footer";
import { Col, Row, Button, Form, Label, Input} from "reactstrap";
import API from "../../utils/API";
import DatePicker from "../../components/DatePicker";

class Dentist extends React.Component{

    constructor(props) {
        super(props);
        this.onDayClick = this.onDayClick.bind(this);
        this.state = {
            selectedDate: new Date(),
            name: "",
            phone: "",
            email: "",
            record: "",
            note: "",
            loggedInId: "",
            loggedinType: "",
        };
      }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        let type = this.props.readCookie("loggedinType")
        this.setState({
            loggedInId: cookieId,
            loggedinType: type
        })
    }
    
    handleEmailInput = (event) => {
        const {name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleEmailSearch = (event) => {
        event.preventDefault();
        
        let email = this.state.email
        API.searchByEmail(email)
        .then((result)=>{
            console.log(result.data)
            this.setState({
                name: result.data.name,
                phone: result.data.phone,
                email: result.data.email,
                record: result.data.record,
                note: result.data.note
            })
        })
        .catch(err=> console.log(err));
    }
    render(){
        const { selectedDate } = this.state;
        return(
            <div>
            <div className="dentistInfo container">
                <Row className = "dentistR1">
                    <Col md="4" xs="4">
                    <Photo />

                    </Col>
                    <Col md="8" xs="8">
                        <div>Great Dr.William is me! Wa hahahahahahahah!!!</div>
                    </Col>
                </Row>
                <Row className="dentistR2">
                    <Col className="patientCard" md="12" xs="12">
                    <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank" rel="noopener noreferrer"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" alt="https://youcanbook.me/resources/pics/ycbm-button.png" style={{'borderStyle':"none"}}/></a>
                    <a href="https://app.youcanbook.me/#/bookings" target="_blank" rel="noopener noreferrer" style={{"paddingLeft":"40px"}}>View Bookings</a>
                    <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank" rel="noopener noreferrer" style={{"paddingLeft": "20px"}}>Admin</a>
                    <div className="App">
                        <div className="MainContent">
                          <DatePicker fullDate={selectedDate} onDayClick={this.onDayClick} />
                        </div>
                    </div>
                        <Form inline>
                            <Label for="searchPatients">Patient's Email:</Label>
                            <Input 
                                value= {this.state.email}
                                onChange={this.handleEmailInput}
                                name="email" 
                                placeholder="chicken@chicken.com" 
                            />
                            <Button onClick={this.handleEmailSearch} color="primary" size="sm">Search</Button>
                           
                        </Form>
                        <div>
                            <FindInfo 
                                userName={ this.state.name }
                                userPhone={ this.state.phone }
                                userEmail={ this.state.email }
                                userRecord={ this.state.record }
                                userNote={ this.state.note }
                            />
                        </div>
                    </Col>
                </Row>
            </div>
                
            </div>
        )
    }

    onDayClick(newDay) {
        const { selectedDate } = this.state;
    
        this.setState({
          selectedDate: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            newDay
            ),
        });
    }
}

export default Dentist;