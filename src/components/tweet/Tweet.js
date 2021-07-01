import React, {useState, useEffect, useRef} from 'react';
import {useStateValue} from '../../context/logContext'
import {refreshToken } from '../../actions/auth-action'
import { API_URL } from '../../setting';
import Like from './Like'
import styled from 'styled-components'


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
  
    return <Container ref={tweetref}>
        <aside>
            <img className="profile" src={author.profile.pp} alt="" />
        </aside>
        <h2><strong>{author.username}</strong></h2>
        <div className='content'>
            <p>{content}</p>
            {picture&& <img src={picture} alt="pictweet" /> }
        </div>
        <div className="action">
            <Like like={like} onClick={handleLike} isLike={islike}/>
            <Like onClick={handleLike} isLike={islike}/>
        </div>
    </Container> 
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  grid-gap: 10px;
  border-radius: 10px;
  background: linear-gradient(145deg,#6cffd0, #5be3af);
  box-shadow:  6px 6px 14px #56d6a5,
    -6px -6px 14px #74ffdf;
  margin: 30px;
  padding:20px;
  overflow:hidden;
  transition:0.5s;
  opacity:0;

  & aside{
    grid-row:span 3;

    & .profile{
        display:block;
        width:50px;
    }
  }
  & h2 {
    cursor:pointer;
  }
  
  & .content{
    overflow-x:hidden;
    word-wrap:break-word;
    padding-right:5px;
    & p {
      margin-bottom:10px;
    }

    & img{
        display: block;
        max-width: 400px;
        margin: auto;
    }
  }

  & .action { 
    display:flex;
    height:50px;
    align-items:center;
    justify-content:space-around;
  }
  
`



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
