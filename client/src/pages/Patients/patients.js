import React from "react";
import { Col, Row, Container } from "reactstrap";
import "./patients.css";
import Profile from "../../components/Profile";


class Patient extends React.Component {
    state = {
        firstName: "Marlon",
        lastName: "Jovez",
        email: "marlonjovez@gmail.com",
        birthday: "1995-04-17",
        phone: "",
        loggedInId: "",
        loggedinType: "",
        editing: false
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        let type = this.props.readCookie("loggedinType")

        this.setState({
            loggedInId: cookieId,
            loggedinType: type
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    editProfile = () => {
        (this.state.editing) ? this.setState({ editing: false }) : this.setState({ editing: true });
    }

    // loadUser() {
    //     UsersController.findById({_id: '5b3bded263fc7e1e4d7acb4d'}).then((response) => {
    //         this.setState({
    //             firstName: response.body.firstName,
    //             lastName: response.body.lastName,
    //             email: response.body.email,
    //             birthday: response.body.birth_date.toDateString()
    //         })
    //     })
    // }

    render() {
        if (this.state.loggedInId === "logged out") {
            window.location.href="/"
        }
        return (
            <Container fluid>
                <Row className="profile">
                    <Col md="4" className="InfoBoxLeft">
                        <h2>Marlon Jovez</h2>
                        <img alt='Marlon 12th grade' src="https://plus.google.com/_/focus/photos/public/AIbEiAIAAABDCPHDwdPiseeqRSILdmNhcmRfcGhvdG8qKDVmMzA0NzY5NzgwYzlhNmRlMWQ2OTU4MTdkMTdhMmMyOWZkZGY4MDIwAfxasVgm4AGxpvb4O_L-r52SqRtd?sz=200" />
                    </Col>
                    <Profile firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        birthday={this.state.birthday}
                        phone={this.state.phone}
                        change={this.handleInputChange}
                        editing={this.state.editing}
                        edit={this.editProfile} />
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