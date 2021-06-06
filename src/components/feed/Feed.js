import React, {useState, useEffect } from 'react';
import styles from './Feed.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken } from '../../actions/auth-action'
import { API_URL } from '../../setting';
import { Tweet } from './Tweet';
import { TweetCreate } from './TweetCreate';

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
      const myHeaders = new Headers();
      if(authToken){
        const updatedToken = await refreshToken(authToken.refresh)
        dispatch({
          type:'REFRESH',
          item: updatedToken.access
        })
        if (updatedToken.status === 401) {
          dispatch({
            type:'DISCONECT'
          })
        }else{
          myHeaders.append("Authorization", `Bearer ${authToken.access}`);
        }

      }


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
