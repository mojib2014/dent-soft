import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Login = () => {
    
    return(
        <div className="Login">
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
                <login-button scope="public_profile,email" onlogin="checkLoginState();"></login-button>
            </Form>
        </div>
    )
    
}


export default Login;