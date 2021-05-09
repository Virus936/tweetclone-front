import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import Login from './components/auth/Login';
import  useAuthToken from './customHook/useToken';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const [authToken, setAuthToken] = useAuthToken('')

  const logout = e => { setAuthToken('') }

  return (
    
    <Router className="App">
      <Header logout={logout}/>
      <Switch>
        <Route path='/login'>
          {authToken.access && <Redirect to='/' />   }
          <h1>Login Page</h1>
          <Login setToken={setAuthToken}/>
        </Route>
        <Route path='/register'>
          <h1>Register Page</h1>

        </Route>
        <Route path='/'>
          <Feed />
        </Route>
      </Switch>
      </Router>
  );
}

export default App;
