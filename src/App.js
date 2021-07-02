import React from 'react';
import './App.css';
import Header from './components/header/Header';
import LeftSide from './components/aside/LeftSide';
import RightSide from './components/aside/RightSide'
import Feed from './pages/feed/Feed';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

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
        <LeftSide />
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
        <RightSide />
      </Router>
    </StateProvider> 
  );
}

export default App;
