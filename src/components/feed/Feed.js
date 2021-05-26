import React, {useState, useEffect, useRef} from 'react';
import styles from './Feed.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, postTweet} from '../../actions/auth-action'
import { API_URL } from '../../setting';


const Tweet = ({author, content, picture,tweetid, numlike, likeornot}) => { 
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


const TweetCreate = ({addTweet}) => {

  const [ authToken , dispatch ] = useStateValue()
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState('');

  const fileRef = useRef(null);
  const handleSubmit = async e => {
    e.preventDefault()
    if (content || picture){
      const updatedToken = await refreshToken(authToken.refresh)
      if (updatedToken.access) {
        
        dispatch({
          type:'REFRESH',
          item: updatedToken.access
        })
      } else window.location = '/login'
      addTweet(await postTweet(e.target, updatedToken.access))
      setContent('')
      setPicture('')
      e.target.reset()
    }
  }
    const handlePicture = () => setPicture(fileRef.current.files[0])

  return (
    <>
      <form className={styles.FormTweet} onSubmit={handleSubmit}>
        <textarea className={styles.Textarea} name="content" value={content} onChange={ (e) => setContent(e.target.value) } cols="30" rows="10" placeholder='tweeter ici'></textarea>
        <div styles="background-color:black;">
          <input className={styles.inputFile} ref={fileRef} type="file" name="picture"  onChange={handlePicture} accept="image/png, image/jpeg" />
          <input type="submit" value="Envoyer" />
        </div>
      </form>
      {(content || picture )&& <Tweet content={content} picture={picture && URL.createObjectURL(picture)}  /> }
    </>)
}

function Feed() {
  const [feed, setFeed] = useState([])
  const [ authToken , dispatch ] = useStateValue()
  
  const addTweet = (tweet) => {
    const newFeed = feed.slice()
    newFeed.unshift(tweet)
    setFeed(newFeed)
    console.log(feed)
  }

  useEffect(() => {

    const fetchAPI = async () => {
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
        method: 'GET',
        headers:myHeaders,
        redirect: 'follow'
      }

      fetch( `${API_URL}/api/tweets`, requestOptions)
        .then(res => res.json())
        .then(res => setFeed(res))
    }

    fetchAPI()
  }, [])

  return (
    <div className={styles.Feed} >
      {authToken && <TweetCreate addTweet={addTweet}/> }

      { feed.map(tweet=><Tweet key={tweet.id} tweetid={tweet.id} numlike= { tweet.numlike } likeornot={tweet.likeornot} author={ tweet.author } picture={tweet.picture} content={tweet.content} />)}
    </div>
  )
}

export default Feed;
