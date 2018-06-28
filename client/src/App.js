import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Dentist from "./pages/Dentist";
import Patients from "./pages/Patients";
import Nav from "./components/Nav";

const App = () => (

  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/dentist" component={Dentist} />
        <Route exact path="/patient/:id" component={Patients} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;
