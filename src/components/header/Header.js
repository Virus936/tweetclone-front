import React from 'react';
import styles from './Header.module.css';
import {ReactComponent as Logo} from './logo.svg'
import {ReactComponent as Logout} from './logout.svg'
import {useStateValue} from '../../context/logContext'

import { Link } from "react-router-dom";

const Log = ({onClick}) => {
  const [ authToken, dispatch ]= useStateValue()

  const disconect = () => {
    dispatch({
      type:'DISCONECT'
    })
  }
  return<div className={styles.Log }>
    <Link className={styles.link} to="/login" onClick={disconect} >
    {authToken?<Logout  className={styles.link} fill='lightyellow'style={{width:'40px', height:'40px' }}/>:'Login' }
    </Link>
    {!authToken&& <Link className={styles.link} to='/register'>
        Register
      </Link>
      }
    </div>
}


function Header({ logout }) {

  return (
    <header className={ styles.Header } >
      <Link to="/">
      <Logo fill='lightyellow' style={{width:'40px', height:'40px' }} />
      </Link>
      <Link className={styles.link} to="/">
      <h1>TweetFarmer</h1>
      </Link>
      <Log />

    </header>
  );
}


export default Header;


