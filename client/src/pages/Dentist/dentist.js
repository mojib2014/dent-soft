import React from "react";
import "./dentist.css";
import FindInfo from "../../components/FindInfo";
import Photo from "../../components/Photo";
// import Footer from "../../components/Footer";
import { Col, Row, Button, Form, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import API from "../../utils/API";
import Calendar from "../../components/Calendar";




const style = {
    position: "relative",
    margin: "50px auto"
}

class Dentist extends React.Component {

    state = {
        name: "",
        phone: "",
        email: "",
        record: "",
        note: "",
        selectedDate: "",
        startingHour: "",
        loggedinId:""
    }

    componentWillMount() {
        let cookieId = this.props.readCookie("loggedinId")

        this.setState({
        loggedInId: cookieId
        })
    }

    onDayClick = (e, day, month, year) => {
        // alert("you have chosen day " + year + "-" + month + "-" + day );
        let fullDate = year + "-" + month + "-" + day;
        let startingHour = "";
        this.setState({
            selectedDate: year + "-" + month + "-" + day,
            startingHour: startingHour
        })
        this.sendReservation(fullDate, startingHour);
    }

    sendReservation = (date, hour) => {
        let reservationInfo={
            user_id: this.state.loggedinId,
            date: date,
            start_time: hour
        }
        //API post to reservation table
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        console.log("user logged in", cookieId);
    }

    handleEmailInput = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleEmailSearch = (event) => {
        event.preventDefault();

        let email = this.state.email
        API.searchByEmail(email)
            .then((result) => {
                console.log(result.data)
                this.setState({
                    name: result.data.name,
                    phone: result.data.phone,
                    email: result.data.email,
                    record: result.data.record,
                    note: result.data.note
                })
            })
            .catch(err => console.log(err));
    }
    render() {
        console.log("in render", this.state.selectedDate)
        return (
            <div>
                <div className="dentistInfo container">
                    <Row className="dentistR1">
                        <Col md="4" xs="4">
                            <Photo />

                        </Col>
                        <Col md="8" xs="8">
                            <div>Great Dr.William is me! Wa hahahahahahahah!!!</div>
                        </Col>
                    </Row>
                    <Row className="dentistR2">
                        <Col className="patientCard" md="12" xs="12">
                            <a href="https://ahmadsahil2000.youcanbook.me/" target="_blank" rel="noopener noreferrer"><img src="https://youcanbook.me/resources/pics/ycbm-button.png" alt="https://youcanbook.me/resources/pics/ycbm-button.png" style={{ 'borderStyle': "none" }} /></a>
                            <a href="https://app.youcanbook.me/#/bookings" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "40px" }}>View Bookings</a>
                            <a href="https://app.youcanbook.me/#/editProfile?id=155f5567-7bcb-47cb-be8a-c27793655fae&section=availability" target="_blank" rel="noopener noreferrer" style={{ "paddingLeft": "20px" }}>Admin</a>
                            <div className="App">
                                <Calendar style={style} width="302px"
                                    onDayClick={(e, day, month, year) => this.onDayClick(e, day, month, year)}
                                />
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        Dropdown
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem id="9">09:00 - 10:00</DropdownItem>
                                        <DropdownItem >Action</DropdownItem>
                                        <DropdownItem>Another Action</DropdownItem>
                                        <DropdownItem>Another Action</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <Form inline>
                                <Label for="searchPatients">Patient's Email:</Label>
                                <Input
                                    value={this.state.email}
                                    onChange={this.handleEmailInput}
                                    name="email"
                                    placeholder="chicken@chicken.com"
                                />
                                <Button onClick={this.handleEmailSearch} color="primary" size="sm">Search</Button>

                            </Form>
                            <div>
                                <FindInfo
                                    userName={this.state.name}
                                    userPhone={this.state.phone}
                                    userEmail={this.state.email}
                                    userRecord={this.state.record}
                                    userNote={this.state.note}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }
}

export default Dentist;