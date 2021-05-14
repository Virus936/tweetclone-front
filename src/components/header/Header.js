import React from 'react';
import styles from './Header.module.css';
import {ReactComponent as Logo} from './logo.svg'
import {useStateValue} from '../../context/logContext'

import { Link } from "react-router-dom";

const Log = ({onClick}) => {
  const [ authToken, dispatch ]= useStateValue()

  const disconect = () => {
    dispatch({
      type:'DISCONECT'
    })
  }
  return <Link to="/login" onClick={disconect} className="link">{authToken?'Logout':'Login' }</Link>
}


function Header({ logout }) {

  return (
    <header className={ styles.Header } >
      <Logo fill='lightyellow' style={{width:'40px', height:'40px' }} />
      <h1>TweetFarmer</h1>
      <Log />

    </header>
  );
}


export default Header;


