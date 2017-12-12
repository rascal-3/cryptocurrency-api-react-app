import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import BitFlyer from './BitFlyer';
import Coincheck from './Coincheck';

const App = () => (
  <Router>
    <div className="app">
      <ul className="left-navi">
        <li><Link to="/bitflyer">bitFlyer</Link></li>
        <li><Link to="/coincheck">coincheck</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={BitFlyer} />
        <Route exact path="/bitflyer" component={BitFlyer} />
        <Route exact path="/coincheck" component={Coincheck} />
      </Switch>
    </div>
  </Router>
);

export default App;
