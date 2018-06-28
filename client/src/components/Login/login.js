import React from "react";

const Login = () => {
    
    return(
        <div className="Login">
            <form>
                <p>
                Welcome Back!
                </p>
                <label>
                    Username: 
                </label>
                <input type="text" name="name" placeholder="username" />
                <input type="text" name="password" placeholder="password" />
                <button type="submit" className="submit">Login</button>
                <button type="submit" className="submit">Sign up</button>
                <login-button scope="public_profile,email" onlogin="checkLoginState();"></login-button>
            </form>
        </div>
    )
    
}


export default Login;