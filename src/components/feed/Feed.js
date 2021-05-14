import React, {useState, useEffect, useRef} from 'react';
import styles from './Feed.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, postTweet} from '../../actions/auth-action'
import { API_URL } from '../../setting';


const Tweet = ({author, content, picture}) => { 
  return <div className={styles.Tweet}>
    <aside>
    <img className={styles.profile} src={author.profile.pp} alt="" />
    </aside>
      <h2>{author.username}</h2>
      <div>
        <p>{content}</p>
        {picture&& <img src={picture} alt="pictweet" /> }
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
    const handlePicture = () => setPicture(fileRef.current.files[0])

  return (
    <>
      <form className={styles.FormTweet} onSubmit={handleSubmit}>
        <textarea className={styles.Textarea} name="content" value={content} onChange={ (e) => setContent(e.target.value) } cols="30" rows="10" placeholder='tweeter ici'></textarea>
        <input type="textarea" name='test' />
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
  const [ authToken ] = useStateValue()
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

      { feed.map(tweet=><Tweet key={tweet.id} author={ tweet.author } picture={tweet.picture} content={tweet.content} />)}
    </div>
  )
}

export default Feed;
