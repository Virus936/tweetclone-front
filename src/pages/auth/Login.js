import React, {useState} from 'react';
import {useStateValue} from '../../context/logContext'
import {Redirect} from 'react-router-dom'
import { API_URL } from '../../setting';
import styled from 'styled-components'

function Login() {
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
    <Container >
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

    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  bottom:50vh;
  justify-content: center;
  align-items: center;
  width:100vw;

  & form {
    display:flex; 
    flex-direction: column;
    gap:20px;
  }

  & input{
    padding: 12px 20px;
    background-color: LightGoldenrodYellow;
    color:mediumseagreen;
    display: inline-block;
    border: solid mediumseagreen;
    border-radius: 4px;
    box-sizing: border-box;
  }

  & input:focus{
    border:mediumseagreen;

    outline:solid seagreen;
    }


  & button{
    padding: 12px 20px;
    border-radius:20px;
    padding: 10px;
    border:solid 2px green ;
    background-color: rgb(0, 156, 98);
    color:#fff;
    font-weight: bold;
  }

`

export default Login;
