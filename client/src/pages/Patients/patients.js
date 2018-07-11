import React from "react";
import { Col, Row, Container } from "reactstrap";
import API from "../../utils/API";
import "./patients.css";
import Profile from "../../components/Profile";
import Photo from "../../components/Photo/Photo";
import Notes from "../../components/NotesPatient";
import Booking from "../../components/Booking";
import Files from "../../components/Files";


class Patient extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        phone: "",
        loggedinId: "",
        loggedinType: "",
        imageLink: "",
        note: [],
        reservations: [],
        record: [],
        editing: false
    }

    componentDidMount() {
        let cookieId = this.props.readCookie("loggedinId")
        let type = this.props.readCookie("loggedinType")

        this.getUser(cookieId, type);

        this.setState({
            loggedinId: cookieId,
            loggedinType: type
        })

        
    }

    getUser(id, type) {
        if(type === "local"){
            API.searchById(id).then((results) => {
                this.setState({
                    firstName: results.data.firstName,
                    lastName: results.data.lastName,
                    email: results.data.email,
                    birthday: (results.data.birth_date ? results.data.birth_date.split("T")[0] : this.state.birthday),
                    phone: (results.data.phone ? results.data.phone : this.state.phone),
                    imageLink: results.data.imageUrl,
                    note: (results.data.note ? results.data.note : this.state.note),
                    record: (results.data.record ? results.data.record : this.state.record),
                    reservations: (results.data.reservations ? results.data.reservations : this.state.reservations)
                })
            }).catch(err => {
                console.log(err)
            })    
        }
        else {
            API.searchByGoogleId(id).then((results) => {
                // console.log(results)
                this.setState({
                    firstName: results.data.firstName,
                    lastName: results.data.lastName,
                    email: results.data.googleEmail,
                    birthday: (results.data.birth_date ? results.data.birth_date.split("T")[0] : this.state.birthday),
                    phone: (results.data.phone ? results.data.phone : this.state.phone),
                    imageLink: results.data.googleImage,
                    note: (results.data.note ? results.data.note : this.state.note),
                    record: (results.data.record ? results.data.record : this.state.record),
                    reservations: (results.data.reservations ? results.data.reservations : this.state.reservations)
                })
                // console.log(this.state.reservations);
            }).catch(err => {
                console.log(err)
            })    
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    editType(){
        if(this.state.loggedinType === "local"){
            API.updateById(this.state.loggedinId, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                birth_date: this.state.birthday,
                phone: this.state.phone,
                imageUrl: this.state.imageLink         
            }).then(results => {
                // console.log(this.state.birthday)
                this.setState({ editing: false })
            }).catch(err =>alert("Numbers only please"))
        }
        else{
            API.updateByGoogleId(this.state.loggedinId, {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                googleEmail: this.state.email,
                birth_date: this.state.birthday,
                phone: this.state.phone,
                googleImage: this.state.imageLink         
            }).then(results => {
                // console.log(this.state.birthday)
                this.setState({ editing: false })
            }) .catch(err => alert("Numbers only please"))
        }
        
    }

    editProfile = () => {
        (this.state.editing) ? 
            this.editType()
          : this.setState({ editing: true });
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
    
        return (
            <Container fluid>
                <Row className="profile">
                    <Col md="4" className="InfoBoxLeft rounded shadow-lg">
                        <Photo DimageUrl={this.state.imageLink}/>
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
                    <Files>
                        {this.state.record.map(r =>{
                            return (
                                <li><a href={r.recordUrl} target="_blank">{r.recordName}</a></li>
                            )
                        })}
                    </Files>
                    <Notes>        
                        {this.state.note.map(n =>{
                            return (
                                <li>{n.note}</li>
                            )
                        })}
                    </Notes>
                </Row>
                <Row className="appointments">
                    <Booking
                        date={this.state.reservations.length > 0 ? this.state.reservations[this.state.reservations.length - 1].date : null} 
                        time={this.state.reservations.length > 0 ? this.state.reservations[this.state.reservations.length - 1].start_time : null} 
                        detail={this.state.reservations.length > 0 ? this.state.reservations[this.state.reservations.length - 1].reservationDetail : null} 
                    />
                </Row>
            </Container>
        )
    }
}

export default Patient;