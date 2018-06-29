import React, {Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class App extends Component {
  constructor (props) {
    super(props),
    this.state= {
      status: "You are logged in as: "
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav status={this.state.status}/>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/dentist" component={Dentist} />
            <Route exact path="/patient/:id" component={Patients} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
};

export default App;
