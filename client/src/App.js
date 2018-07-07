import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import '../src/less/input-moment.less';
import moment from 'moment';
import packageJson from '../package.json';

class App extends Component {

  state = {
    demo: "demo",
    loggedInId: "",
    loggedInWith: "",
    userType: "",
  }

  componentWillMount() {
    let cookieId = this.readCookie("loggedinId")
    let type = this.readCookie("loggedinType")
    let userType = this.readCookie("userType")
    
    if (cookieId === "") {
      this.createCookie("loggedinId", "logged out", 1)
      window.location.href = "/";
    } else {
      console.log("login id", cookieId)
      console.log("type", type) //google or local
      console.log("userType", userType)//admin or patient
      this.setState({
        loggedInId: cookieId,
        userType: userType
      })
    }
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
    this.eraseCookie("loggedinId")
    this.setState({
      loggedInId: ""
    })
    this.redirect()
  }
  //##################end logout

  redirect = () => {
    if (this.state.loggedInId) {
      window.location.href = "/";
    }
  }

  render() {
    if (this.state.loggedInId === "loggedOut") {
      return (
       window.location.href="/"
      )
    } 
    return (
      <div>
        <Nav>
          <a className="navbar-brand" href="/">
            Dentsoft
          </a>
          {(this.state.loggedInId === "logged out") ? (
            "hi"
          ) : (
            <div>
              <p>
                Welcome Back
              </p>
              <button 
                onClick={this.logOut}
              >
              logout
              </button>
            </div>
          )}
        </Nav>
        <Router>
            {(this.state.loggedInId==='logged out') ? (
              <Switch>
                <Route exact path="/" component={() => (<Main createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
                <Redirect from="/:anything" to="/" />
              </Switch>
            ) : ( 
              this.state.userType === "patient" ? (
                <Switch>
                  <Route exact path="/" component={() => (<Main createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
                  <Route exact path="/patient" component={() => (<Patients createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut} />)} />
                  <Route exact path="/auth/logout" component={Main} />
                  <Route component={NoMatch} />
                </Switch>
              ):(
                <Switch>
                  <Route exact path="/" component={() => (<Main createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut}/>)} />
                  <Route exact path="/dentist" component={() => (<Dentist createCookie={this.createCookie} readCookie={this.readCookie} checkLogIn={this.checkLogIn} logOut={this.logOut} />)} />
                  <Route exact path="/auth/logout" component={Main} />
                  <Route component={NoMatch} />
                </Switch>
              )
            )}
        </Router>
        <Footer />
      </div>
    )
  }
};

export default App;
