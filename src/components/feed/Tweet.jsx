import React, {useState, useEffect, useRef} from 'react';
import styles from './Tweet.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken } from '../../actions/auth-action'
import { API_URL } from '../../setting';


export const Tweet = ({author, content, picture,tweetid, numlike, likeornot}) => { 
  const tweetref = useRef(null)
  const [like, setLike] = useState(numlike);
  const [ authToken , dispatch ] = useStateValue()
  const [islike, setIslike] = useState(likeornot)

  const displayTweet = (entries, observer) => {
    entries.forEach(entry =>{
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = 'translateX(0)'
      }else{
        entry.target.style.opacity=0
        entry.target.style.transform = 'translateX(-20px)'
      }
    })
  }
  const options = {
    threshold:0.3
  }
  useEffect( () => {
    const observer = new IntersectionObserver(displayTweet,options)
    observer.observe(tweetref.current)
  })
  const handleLike = async() => {

    const updatedToken = await refreshToken(authToken.refresh)

    if (updatedToken.access) {
      dispatch({
        type:'REFRESH',
        item: updatedToken.access
      })
    } 

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken.access}`);

    let requestOptions = {
      method: 'PUT',
      headers:myHeaders,
      redirect: 'follow'
    }

    fetch(`${API_URL}/api/like/${tweetid}`, requestOptions)
    console.log('qweqwe')
    setLike(like+!islike-islike)
    setIslike(!islike)


  }
  
  return <div className={styles.Tweet} ref={tweetref}>
    <aside>
    <img className={styles.profile} src={author.profile.pp} alt="" />
    </aside>
      <h2>{author.username}</h2>
      <div>
        <p>{content}</p>
        {picture&& <img src={picture} alt="pictweet" /> }
        <span onClick={handleLike}>{like} like {islike?'true':'false'}</span>
      </div>
    </div> 
}
Tweet.defaultProps = {
  author : {
    username:'',
    profile:{
      pp:''
    }
  },
  content:'le contenu du tweet',
  picture:''
};
