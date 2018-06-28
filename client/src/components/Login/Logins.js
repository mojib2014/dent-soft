import React from "react";
// import keys from "../../../../keys";
import { Button, Form, Label, Input } from "reactstrap";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {
    signup() {

    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);

        }

        const responseFacebook = (response) => {
            console.log(response);
        }

        return (

            <div>
                <Form>
                    <p>
                        Welcome Back!
                    </p>
                    <Label>
                        Username:
                </Label>
                    <Input type="text" name="name" placeholder="username" />
                    <Input type="text" name="password" placeholder="password" />
                    <Button type="submit" className="submit">Login</Button>
                    <Button type="submit" className="submit">Sign up</Button>
                </Form>
                <GoogleLogin
                    clientId="581039946042-esa7akgitusf5atfeod11j2p07oft4ml.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
                <FacebookLogin
                    appId="1935086019882329"
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                />
            </div >
        );
    }

}

export default Login;


