import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import LoginState from "./components/Login_state";

class App extends Component {

  state = {
    demo: "demo",
    loggedInId: "",
    loggedInWith: "",
  }

  // Cookie
  createCookie = (name, value, days) => {
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
  }

  readCookie = a => {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  eraseCookie = (name) => {
    this.createCookie(name, "", -1);
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

  //******************log out */
  logOut = () => {
    this.eraseCookie("loggedInId")
    this.setState({
      loggedInId: ""
    })
  }
  //##################end logout

  redirect = () => {
    if (this.state.loggedInId) {
      window.location.href = "/";
    }
  }

  render() {
    console.log(this.state.loggedInId)
    return (
      <div>
        <Nav>
          <a className="navbar-brand" href="/">
            Dentsoft
                    </a>
          {(this.state.loggedInId === "") ? (
            "hi"
          ) : (
              <LoginState>
                Welcome Back
                    </LoginState>
            )}
        </Nav>
        <Router>
          <Switch>
            <Route exact path="/" component={() => (<Main createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut} />)} />
            <Route exact path="/dentist" component={() => (<Dentist createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut} />)} />
            <Route exact path="/patient" component={() => (<Patients createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut} />)} />
            {/* <Route exact path="/auth/login" component={Main} /> */}
            <Route exact path="/auth/logout" component={Main} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
        <Footer />
      </div>
    )
  }
};

export default App;
