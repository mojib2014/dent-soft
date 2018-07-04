import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import LoginState from "../src/components/Login_state"

class App extends Component {

  state = {
    demo: "demo",
    isLoggedin: false,
    loggedInEmail: "",
    loggedInId: "",
    loggedInWith: ""
  }

  changeLoginStatus = (email, id, loggedInWith) => {
    this.setState({
      // demo: "state changed by login and it can be passed to patients page!"
      isLoggedin: true,
      loggedInEmail: email,
      loggedInId: id,
      loggedInWith: loggedInWith
    })
  }

  render() {
    // console.log(this.state.loggedInEmail)
    return (
      <div>
        <Nav>
          <a className="navbar-brand" href="/">
            Dentsoft
                    </a>
          {(this.state.loggedInEmail && this.state.isLoggedIn) ? (
            <LoginState>
              You are logged in as:  {this.state.loggedInEmail}
            </LoginState>
          ) : (
              ""
            )}
        </Nav>
        <Router>
          <Switch>
            <Route exact path="/" component={() => (<Main login={this.changeLoginStatus} />)} />
            <Route exact path="/dentist" component={Dentist} />
            <Route exact path="/patient" component={()=>(<Patients loginId={this.state.loggedInId} loginEmail={this.state.loggedInEmail} loginWith={this.state.loggedInWith}/>)} />
            <Route exact path="/auth/login" component={Main} />
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
