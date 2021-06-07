import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile'
import Register from './components/register/Register'

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
            <Profile/>
          </Route>
          <Route path='/register'>
            <Register/>
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
