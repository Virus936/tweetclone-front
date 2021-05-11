import React, {useState, useEffect} from 'react';
import styles from './Feed.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, postTweet} from '../../actions/auth-action'
import { API_URL } from '../../setting';


const Tweet = ({author, content, picture}) => { 
  return <div className={styles.Tweet}>
      <h2>{author}</h2>
      <div>
        <p>{content}</p>
        {picture&& <img src={picture} alt="pictweet" /> }
      </div>
    </div> 
}

const TweetCreate = ({addTweet}) => {

  const [ authToken , dispatch ] = useStateValue()
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState('');

  const handleSubmit = async e => {
    e.preventDefault()
    if (content || picture){
      const updatedToken = await refreshToken(authToken.refresh)
      dispatch({
        type:'REFRESH',
        item: updatedToken.access
      })
      addTweet(await postTweet(e.target, updatedToken.access))
      setContent('')
      setPicture('')
      e.target.reset()
    }
  }
  const handlePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <>
    <form className={styles.FormTweet} onSubmit={handleSubmit}>
    <textarea className={styles.Textarea} name="content" value={content} onChange={ (e) => setContent(e.target.value) } cols="30" rows="10" placeholder='tweeter ici'></textarea>
    <input id="qwe" type="file" name="picture"  onChange={handlePicture} accept="image/png, image/jpeg" />
    <input type="submit" value="Envoyer" />
  </form>
      {(content || picture )&& <Tweet content={content} picture = {picture} /> }
    </>)
}

function Feed() {
  const [feed, setFeed] = useState([])
  const [ authToken , dispatch ] = useStateValue()
  const addTweet = (tweet) => {
    const newFeed = feed.slice()
    newFeed.unshift(tweet)
    setFeed(newFeed)
  }

  useEffect(() => {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch( `${API_URL}/api/tweets`, requestOptions)
      .then(res => res.json())
      .then(res => setFeed(res))
  }, [])

  return (
    <div className={styles.Feed}>
      {authToken && <TweetCreate addTweet={addTweet}/> }

      { feed.map(tweet=><Tweet key={tweet.id} author={tweet.author} picture={tweet.picture} content={tweet.content} />)}
    </div>
  )
}

export default Feed;
