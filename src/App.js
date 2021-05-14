import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import Login from './components/auth/Login';

import { StateProvider } from './context/logContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <StateProvider > 
    <Router className="App">
      <Header />
      <Switch>
        <Route path='/login'>
          
          <Login />
        </Route>
        <Route path='/profile'>
          <h1>Page de profile</h1>
        </Route>
        <Route path='/register'>
          <h1>Register Page</h1>
        </Route>
        <Route path='/'>
          <Feed />
        </Route>
      </Switch>
      </Router>
    </StateProvider> 
  );
}

export default App;
