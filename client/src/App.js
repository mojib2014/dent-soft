import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Footer from "./components/Footer";


class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/dentist" component={Dentist} />
            <Route exact path="/patient" component={Patients} />
            <Route exact path="/auth/login" component={Main} />
            <Route exact path="/auth/logout" component={Main} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
};

export default App;
