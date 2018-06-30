import React, { Component } from "react";
// import Card from "../../components/Card"
import { Input, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
// import ContactForm from "../../components/ContactForm";
import LoginState from "../../components/Login_state"
import { Col, Row, Container } from "reactstrap";


class Main extends Component {

    constructor(props) {
        super(props),
            this.state = {
                logInEmail: "",
                loginPassword: "",
                signUpEmail: "",
                signUpPassword: "",
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

    handleLoginSubmit = (event) => {
        event.preveentdefault();
        if (this.state.email && this.state.password) {
            console.log("login form submit, add API")
            // API
        }
    }

    handleSignUpSubmit = (event) => {
        event.preveentdefault();
        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
            console.log("Signup form submit, add API")
            // API
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    showSignUp = () => {
        this.setState({
            isSignUpClicked: true
        })
    }

    showLogIn = () => {
        this.setState({
            isSignUpClicked: false
        })
    }

    render() {
        return (
            <div>
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
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <div className="intro">
                                <p>Great William is Watching You!</p>
                            </div>
                        </Col>
                        <Col size="md-6">
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
                                            <a onClick={this.showLogIn}>
                                                <h3 style={{ textDecoration: "underline" }}>back to log in</h3>                                        </a>
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
                                                    onClick={this.handleLoginSubmit}
                                                >
                                                    Login
                                        </FormBtn>
                                                <span> OR </span>
                                                <a onClick={this.showSignUp}>
                                                    <h3 style={{ textDecoration: "underline" }}>Sign Up</h3>
                                                </a>
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