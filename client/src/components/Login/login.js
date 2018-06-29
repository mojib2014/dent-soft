import React from "react";
import "./Login.css";
import { Button, Form, Label, Input } from "reactstrap";
import API from "../../utils/API";
// import Patients from "../../pages/Patients";
// import keys from "../../../../keys";
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import { GoogleLogout, logout } from 'react-google-login';
// import { Redirect } from "react-router-dom";


class Login extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        email: "william@gmail.com",
        password: "",
        phone: "",
        birthDate: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        isSignUpClicked: false,
        isLoggedIn: false
    }

    handleInputChange = event => {
        console.log(event.target)
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSignUpSubmit = event => {
        event.preventDefault();
        // API.saveNewPatient({

        // })
    }

    handleLocalLogin = (event) => {
        event.preventDefault();
        // make sure both email and password
        // if (this.state.title && this.state.author) {
        //     API.localLogIn({
        //         email: this.state.email
        //     }).then((result) => {
        //         console.log(result);
        //         //conpare hashed password
        //     });

        // }
    }

    showSignUp = (event) => {
        event.preventDefault();
        this.setState({
            isSignUpClicked: true
        })
    }

    backToLogin = () => {
        this.setState({
            isSignUpClicked: false
        })
    }

    googleLogin = ()=>{
        API.googleLogin().then((result)=>{
            console.log(result)
        })
    }

    logout = () => {
        this.setState({
            isLoggedIn: false
        })
    }
    render() {

        return (

            <div>
                {this.state.isSignUpClicked ? (
                    <div className="card" id="loginCard">
                        <Form>
                            <div>
                                <Label className="h3">
                                    Patient SignUp
                                </Label>
                            </div>
                            <h6>First Name:</h6> <Input type="text" name="firstName" className="mb-2" placeholder="First Name" />
                            <h6>Last Name:</h6> <Input type="text" name="lastName" className="mb-2" placeholder="Last Name" />
                            <h6>Email:</h6> <Input type="email" name="email" className="mb-2" placeholder="abc@gmail.com" />
                            <h6>Password:</h6> <Input type="password" name="password" className="mb-2" placeholder="password" />
                            {/* <h6>Phone:</h6> <Input type="number" name="phone" className="mb-2" placeholder="888123456" />
                            <h6>Birthdate:</h6> <Input type="date" name="birthDate" className="mb-2" placeholder="yyy-mm-dd" />
                            <h6>address:</h6> <Input type="text" name="address" className="mb-2" placeholder="ex 123 Future Way" />
                            <h6>City:</h6> <Input type="text" name="city" className="mb-2" placeholder="city" />
                            <h6>State:</h6> <Input type="text" name="state" className="mb-2" placeholder="state" />
                            <h6>ZipCode:</h6> <Input type="number" name="zipcode" className="mb-2" placeholder="zipcode" /> */}
                            <Button type="submit" className="submit" onClick={this.handleLocalLogin}>Sign up</Button>
                            <a onClick={this.backToLogin}>Back To Login</a>
                        </Form>
                    </div>
                ) : (
                        <div className="card" id="loginCard">
                            <Form>
                                <div>
                                    <Label className="h3">
                                        Patient Login
                                    </Label>
                                </div>
                                <h6>Email:</h6> <Input type="text" name="email" className="mb-2" placeholder="email" />
                                <h6>Password:</h6> <Input type="password" name="password" placeholder="password" />
                                <Button type="submit" className="submit" onClick={this.handleLocalLogin}>Login</Button> Or
                                <Button type="submit" className="submit" onClick={this.showSignUp}>Sign up</Button>
                                <Button type="submit" className="submit" onClick={this.googleLogin}>google Login</Button>
                            </Form>

                        </div>
                    )}
            </div>
        );
    }

}

export default Login;


