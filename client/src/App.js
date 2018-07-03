import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

class App extends Component {

  state={
    demo: "demo"
  }

  changeStateFromMain=(print)=>{
    this.setState({
      demo: "state changed by login and it can be passed to patients page!"
    })

    console.log(print, this.state.demo)
  }

  render() {
    console.log(this.state.demo)
    return (
      <div>
      <Nav >Dental Connect</Nav>
      <Router>
          <Switch>
            <Route exact path="/" component={()=>(<Main changeState={this.changeStateFromMain}/>)} />
            <Route exact path="/dentist" component={Dentist} />
            <Route exact path="/patient" component={Patients} />
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
