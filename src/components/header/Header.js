import React from 'react';
import styles from './Header.module.css';
import {ReactComponent as Logo} from './logo.svg'
import {useStateValue} from '../../context/logContext'

import { Link } from "react-router-dom";

const Log = ({onClick}) => <Link to="/login" onClick={onClick} className="link">Logout</Link>


function Header({ logout }) {
  const [ authToken, dispatch ]= useStateValue()

  return (
    <header className={ styles.Header } >
      <Logo fill='lightyellow' style={{width:'40px', height:'40px' }} />
      <h1>TweetFarmer</h1>
      <Log onClick={()=>{
        dispatch({
          type:'DISCONECT'
        })
      }}/>
    </header>
  );
}


export default Header;


