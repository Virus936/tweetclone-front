import React, {useState} from 'react';
import './Login.css';

const BASE_URL = "http://localhost:8000"

function Login({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = e => {
    e.preventDefault()

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password",password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(BASE_URL+"/auth/login/", requestOptions)
      .then(response => response.json())
      .then(result => setToken(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="login">
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
