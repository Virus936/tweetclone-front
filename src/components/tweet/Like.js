import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Like({isLike, onClick, like}) {

  return <span onClick={onClick}>
    {like}
    <FontAwesomeIcon 
      color={isLike?'red':'lightgrey'}
      icon={faHeart} 
    />
    </span> 
  
}

export default Like;
