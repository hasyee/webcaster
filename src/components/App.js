import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Broadcaster from './Broadcaster';
import Receiver from './Receiver';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/broadcast" exact>
            <Broadcaster />
          </Route>
          <Route path="/receive" exact>
            <Receiver />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
