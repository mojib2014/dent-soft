import React, { Component } from "react";
import "./Main.css";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Col, Row, Container } from "reactstrap";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";


//to do: 1. log out  2. identify dentist and redirect to dentist page 3.make input disapear after submit

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            logInEmail: "",
            logInPassword: "",
            signUpEmail: "",
            signUpPassword: "",
            GoogleClientId: "",
            firstName: "",
            lastName: "",
            loggedInId: "",
            notice: "",
            isSignUpClicked: false,
        }
    }

    componentDidMount() {
        this.setState({
            logInEmail: "",
            logInPassword: "",
            signUpEmail: "",
            signUpPassword: "",
            isSignUpClicked: false
        })
        
        let cookieId = this.props.readCookie("loggedinId")
        console.log("user logged in", cookieId);
        
        this.getGoogleClientId();
    }

    checkLogIn = (loggedInId) => {
        console.log("APP", loggedInId)
        if (!loggedInId === "") {
            this.setState({
                loggedInId: loggedInId
            })
        } else {
            this.setState({
                loggedInId: ""
            })
        }
    }
    //****************google auth !!!!!!!!! get element by ID!!!!!
    getGoogleClientId = () => {
        API.getGoogleId().then((result) => {
            // console.log(result.data.clientId)
            this.setState({
                GoogleClientId: result.data.clientId
            })

            const responseGoogle = (response) => {
                console.log(response);

                let googleUser = {
                    googleId: response.googleId,
                    googleEmail: response.profileObj.email,
                    googleImage: response.profileObj.imageUrl,
                    firstName: response.profileObj.givenName,
                    lastName: response.profileObj.familyName
                }
                //check if google Id existed, findOne and Create use {upsert: true} in findOne and Update
                API.newLogin(googleUser)
                    .then((result) => {
                        console.log(result);
                        if (result.status === 200) {
                            //set cookie
                            this.props.createCookie("loggedinId", result.data._id, 1)
                            //redirect to patient page 
                            window.location.href = "/patient";
                        } else {
                            console.log("some thing went wrong, erro code: ", result.status)
                            document.getElementById("failLoginNotice").innerHTML = `some thing went wrong, erro code: ${result.status}`;
                        }
                    }).catch(err => { console.log(err) })

                console.log(googleUser)

            }
            ReactDOM.render(
                <GoogleLogin
                    clientId={result.data.clientId}
                    buttonText="Login With Google +"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />,
                document.getElementById('googleButton')
            );
        })
    }
    //#################end google auth

    //****************local login
    showLogIn = () => {
        this.setState({
            isSignUpClicked: false
        })
    }

    //*******************form  */
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    //*******************sign up
    showSignUp = () => {
        this.setState({
            isSignUpClicked: true
        })

    }

    handleSignUpSubmit = (event) => {
        event.preventDefault();

        if (this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName) {
            if (this.state.signUpEmail ) {

            }
            let newPatient = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            }

            API.createAccount(newPatient)
                .then((result) => {
                    console.log(result);
                    //sign up err handling
                    if (result.data._id) {
                        // alert("new user created, redirect to login")
                        this.setState({
                            logInEmail: this.state.signUpEmail,
                            logInPassword: this.state.signUpPassword,
                        })
                        // console.log(this.state.logInEmail, this.state.logInPassword)
                        this.handleLocalLoginSubmit(event);
                    } else if (result.data.name === "ValidationError") {
                        //if email is not in email format
                        // alert(result.data.message)
                        this.setState({notice: result.data.message})
                    } else if (result.data.message === "Email Already Existed!") {
                        // alert(result.data.message)
                        this.setState({notice: result.data.message})
                    } else {
                        // alert("something went wrong, please refresh and try again")
                        this.setState({notice: "something went wrong, please refresh and try again"})
                    }
                }).catch(err => console.log(err))
        } else {
            // alert("Entry Can't Be Empty");
            this.setState({notice: "Entry Can't Be Empty"})
        }
    }

    //##################end sign up

    //****************** login  */
    handleLocalLoginSubmit = (event) => {
        event.preventDefault();
        if (this.state.logInEmail && this.state.logInPassword) {
            let loginInfo = {
                email: this.state.logInEmail,
                password: this.state.logInPassword
            }
            API.localLogIn(loginInfo)
                .then(
                    (result) => {
                        console.log("front",result)
                        let isMatch = result.data.message;
                        
                        if (isMatch) {
                            //log out other account if existed -- cookie
                            this.props.logOut();
                            //set cookie to keep log in
                            this.props.createCookie("loggedinId", result.data._id, 1)
                            // after set cookie, redirect to patients page
                            window.location.href = "/patient";
                        } else {
                            // alert ("Log in failed, email or password do not match record")
                            this.setState({notice: "Log in failed... Please verify credentials"})
                        }
                    }
                )
                .catch(err => console.log(err))
        } else {
            // alert("Entry Can't Be Empty");
            this.setState({notice: "Entry Can't Be Empty"})
        }
    }

    //###################end log in


    render() {

        return (
            <div id="homePage">
                <Container fluid style={{ height: 700 }}>
                    <Row>
                        <Col >
                            <div className="intro">
                                <p>Great William is Watching You!</p>
                                <span onClick={() => this.props.changeState("this is clicked")}> click me for demo</span>
                            </div>
                        </Col>
                        <Col style={{ paddingLeft: 300, paddingTop: 100 }}>
                            <div className="card mb-5 mt-5" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    {this.state.isSignUpClicked ? (
                                        <form>
                                            <h2>Sign Up Here </h2>
                                            <Input
                                                value={this.state.firstName}
                                                onChange={this.handleInputChange}
                                                name="firstName"
                                                placeholder="Fist Name (required)"
                                            />
                                            <Input
                                                value={this.state.lastName}
                                                onChange={this.handleInputChange}
                                                name="lastName"
                                                placeholder="Last Name (required)"
                                            />
                                            <Input
                                                value={this.state.signUpEmail}
                                                onChange={this.handleInputChange}
                                                name="signUpEmail"
                                                placeholder="Email (required)"
                                            />
                                            <Input
                                                value={this.state.signUpPassword}
                                                onChange={this.handleInputChange}
                                                name="signUpPassword"
                                                placeholder="Password (required)"
                                            />
                                            <div className="text-danger">{this.state.notice}</div>
                                            <FormBtn
                                                disabled={!(this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName)}
                                                onClick={this.handleSignUpSubmit}
                                            >
                                                Sign Up
                                            </FormBtn>
                                            <span> OR </span>
                                            <br></br>
                                            <a onClick={this.showLogIn}>
                                                <span
                                                    style={{ textDecoration: "underline", fontSize: 20 }}
                                                    // to show google login 
                                                    onClick={this.getGoogleClientId}
                                                >
                                                    back to log in
                                                </span>
                                            </a>
                                        </form>
                                    ) : (
                                            <form>
                                                <h2>Log In Here </h2>
                                                <Input
                                                    value={this.state.logInEmail}
                                                    onChange={this.handleInputChange}
                                                    name="logInEmail"
                                                    placeholder="Email (required)"
                                                />
                                                <Input
                                                    value={this.state.logInPassword}
                                                    onChange={this.handleInputChange}
                                                    name="logInPassword"
                                                    placeholder="Password (required)"
                                                />
                                                <div className="text-danger">{this.state.notice}</div>
                                                <FormBtn
                                                    disabled={!(this.state.logInEmail && this.state.logInPassword)}
                                                    onClick={this.handleLocalLoginSubmit}
                                                >
                                                    Login
                                            </FormBtn>
                                                <span> OR </span>
                                                <br></br>
                                                <a onClick={this.showSignUp}>
                                                    <span style={{ textDecoration: "underline", fontSize: 20 }}>Sign Up</span>
                                                </a>
                                                <div id="failLoginNotice"></div>
                                                <div id="googleButton"></div>
                                            </form>

                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Main;