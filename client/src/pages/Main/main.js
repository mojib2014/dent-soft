import React, { Component } from "react";
import "./Main.css";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Col, Row, Container } from "reactstrap";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";

//to do: 1.better redirect 2. first time google log in 2. if logged in as patient, should be able to go to route /dentist

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
        // this is to get client id from keys.js
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
                    lastName: response.profileObj.familyName,
                    imageUrl: response.profileObj.imageUrl
                }
                //check if google Id existed, findOne and Create use {upsert: true} in findOne and Update
                API.googleLogin(googleUser)
                    .then((result) => {
                        console.log(result.data);
                        if (result.status === 200 && result.data !== "") {
                            //set cookie if user is in our database data is not null
                            this.props.createCookie("loggedinId", result.data._id, 1)
                            this.props.createCookie("loggedinType", "google", 1)
                            //redirect to patient page or admin page depend on user type
                            this.redirect(result.data.userType);
                        }
                        else if (result.data === "") {
                            // first time google login get mongo _id and write into cookie
                            console.log("first time")
                            // API.googleLogin(googleUser).then((result)=>{
                            //     this.props.createCookie("loggedinId", result.data._id, 1)
                            //     window.location.href = "/patient";
                            // })

                        } 
                        else {
                            console.log("some thing went wrong, erro code: ", result.status)
                            document.getElementById("failLoginNotice").innerHTML = `some thing went wrong, erro code: ${result.status}`;
                        }
                    }).catch(err => { console.log(err) })

                console.log(googleUser)

            }
            ReactDOM.render(
                // react-google-oauth  try this 
                <div>
                    <GoogleLogin
                        clientId={result.data.clientId}
                        buttonText='Login With Google +'
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                    />
                </div>,
                document.getElementById('googleButton')
            );
        })
    }
    //#################end google auth

    //******************* redirect */
    redirect =(type) => {
        if (type === "admin") {
            this.props.createCookie("userType", type, 1)
            window.location.href = "/dentist";
        } else {
            this.props.createCookie("userType", "patient", 1)
            window.location.href = "/patient";
        }
    }
    //#################end redirect
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
            
            let newPatient = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword,
                userType: "patient"
            }

            API.createAccount(newPatient)
                .then((result) => {
                    console.log(result);
                    //sign up err handling
                    if (result.data._id) {
                        // alert("new user created, redirect to login")
                        this.setState({
                            logInEmail: this.state.signUpEmail.toLowerCase(),
                            logInPassword: this.state.signUpPassword,
                        })
                        // console.log(this.state.logInEmail, this.state.logInPassword)
                        this.handleLocalLoginSubmit(event);
                        
                    } else if (result.data.name === "ValidationError") {
                        //if email is not in email format
                        // alert(result.data.message)
                        this.setState({ notice: result.data.message })
                    } else if (result.data.message === "Email Already Existed!") {
                        // alert(result.data.message)
                        this.setState({ notice: result.data.message })
                    } else {
                        // alert("something went wrong, please refresh and try again")
                        this.setState({ notice: "something went wrong, please refresh and try again" })
                    }
                }).catch(err => console.log(err))
        } else {
            // alert("Entry Can't Be Empty");
            this.setState({ notice: "Entry Can't Be Empty" })
        }
    }

    //##################end sign up

    //****************** login  */
    handleLocalLoginSubmit = (event) => {
        event.preventDefault();
        if (this.state.logInEmail && this.state.logInPassword) {
            let loginInfo = {
                email: this.state.logInEmail.toLowerCase(),
                password: this.state.logInPassword
            }
            API.localLogIn(loginInfo)
                .then(
                    (result) => {
                        // console.log("front", result)
                        let isMatch = result.data.message;

                        if (isMatch) {
                            //log out other account if existed -- cookie
                            this.props.logOut();
                            //set cookie to keep log in
                            this.props.createCookie("loggedinId", result.data._id, 1)
                            this.props.createCookie("loggedinType", "local", 1)
                            // after set cookie, redirect to patients page or admin page depend on user type
                            this.redirect(result.data.userType);
                        } else {
                            // alert ("Log in failed, email or password do not match record")
                            this.setState({ notice: "Log in failed... Please verify credentials" })
                        }
                    }
                )
                .catch(err => console.log(err))
        } else {
            // alert("Entry Can't Be Empty");
            this.setState({ notice: "Entry Can't Be Empty" })
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
                                                placeholder="First Name (required)"
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
                                                type="password"
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
                                                    type="password"
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
                                                {/* <a href="www.google.com"><img src="data:image/png;base64,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" /> </a>  */}
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