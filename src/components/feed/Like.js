import React from 'react';
import styles from './Like.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Like({isLike, onClick}) {

  return <span onClick={onClick}>
    <FontAwesomeIcon 
      color={isLike?'red':'lightgrey'}
      icon={faHeart} 
    />
    </span> 
  
}

export default Like;
