import React, {useState} from 'react';
import styles from './Login.module.css';
import {useStateValue} from '../../context/logContext'
import {Redirect} from 'react-router-dom'
import { API_URL } from '../../setting';

function Login({setToken}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ authToken, dispatch ]= useStateValue()

  const handleLogin = async e => {
    e.preventDefault()

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password",password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    let response = await fetch(`${API_URL}/auth/login/`, requestOptions)
    if (( 200 <= response.status ) && ( response.status < 300 )) {
      response = await response.json()
      dispatch({
        type:'LOGIN',
        item:response
      })
    }
  }

  return (
    <div className={styles.Login}>
      {authToken?.access &&  <Redirect to='/'/> }
      <form action="/">
        <input 
          name="username" 
          type="text" 
          value={username}
          placeholder='username' 
          onChange={e=>{
            e.preventDefault()
            setUsername(e.target.value)}}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="password" 
          onChange = { e => {
            e.preventDefault()
            setPassword(e.target.value)
          }}
        />
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
      
    </div>
  );
}

export default Login;
