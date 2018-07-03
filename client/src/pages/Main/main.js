import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { Col, Row, Container } from "reactstrap";
import "./Main.css";
import API from "../../utils/API";
import Nav from "../../components/Nav";
import { Input, FormBtn } from "../../components/Form";
// import Card from "../../components/Card"
// import ContactForm from "../../components/ContactForm";
import LoginState from "../../components/Login_state"


class Main extends Component {

    constructor(props) {
        super(props),
            this.state = {
                logInEmail: "",
                loginPassword: "",
                signUpEmail: "",
                signUpPassword: "",
                GoogleClientId: "",
                status: "You are logged in as: ",
                firstName: "",
                lastName: "",
                phone: "",
                birthDate: "",
                address: "",
                city: "",
                state: "",
                zipcode: "",
                isSignUpClicked: false,
                isLoggedIn: false
            }
    }

    componentDidMount() {
        this.setState({
            logInEmail: "",
            loginPassword: "",
            signUpEmail: "",
            signUpPassword: "",
            isSignUpClicked: false
        })

        this.getGoogleClientId();
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
                            //redirect to patient page with id as params
                            // alert("new user created");
                            this.setState({
                                isLoggedIn: true
                            });
                            console.log(this.state.isLoggedIn)

                            //save userID to session storage
                            sessionStorage.setItem("loggedInId", result.data._id)
                            sessionStorage.setItem("loggedInWith", "google")

                            // write _id in to cookieSession
                            // let idObj = {
                            //     userId: result.data._id
                            // }
                            // API.setCookie(idObj)
                            //     .then((result) => {
                            //         console.log("cookie fb", result)
                            //     })
                        } else {
                            console.log("some thing went wrong, erro code: ", result.status)
                            document.getElementById("failLoginNotice").innerHTML = `some thing went wrong, erro code: ${result.status}`;
                        }
                    }).catch(err=>{console.log(err)})

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

    handleLocalLoginSubmit = (event) => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            console.log("login form submit, add API")
            // API
        }
    }

    //###################end local login

    //*******************sign up
    showSignUp = () => {
        this.setState({
            isSignUpClicked: true
        })
    }

    handleSignUpSubmit = (event) => {
        event.preventDefault();

        if (this.state.signUpEmail && this.state.signUpPassword && this.state.firstName && this.state.lastName) {
            console.log("Signup form submit, add API")

            let newPatient={
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            }

            API.createAccount(newPatient)
            .then((result)=>{
                console.log(result);
            }).catch(err=>console.log(err))
        }
    }

    //##################end sign up

    //******************log out */
    logOut = ()=>{

    }
    //##################end logout

    //*******************form  */
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    //###################

    render() {

        if (this.state.isLoggedIn) {
            return <Redirect to='/patient' />
        }

        return (
            <div id="homePage">
                <Nav>
                    <a className="navbar-brand" href="/">
                        Dentsoft
                    </a>
                    {(this.state.logInEmail && this.state.isLoggedIn) ? (
                        <LoginState>
                            You are logged in as:  {this.state.logInEmail}
                        </LoginState>
                    ) : (
                            ""
                        )}
                </Nav>
                <Container fluid style={{ height: 700 }}>
                    <Row>
                        <Col >
                            <div className="intro">
                                <p>Great William is Watching You!</p>
                                <span onClick={()=>this.props.changeState("this is clicked")}> click me for demo</span>
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
                                                    value={this.state.loginPassword}
                                                    onChange={this.handleInputChange}
                                                    name="loginPassword"
                                                    placeholder="Password (required)"
                                                />
                                                <FormBtn
                                                    disabled={!(this.state.logInEmail && this.state.loginPassword)}
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