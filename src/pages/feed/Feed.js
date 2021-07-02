import React, {useState, useEffect } from 'react';
import {useStateValue} from '../../context/logContext'
import {refreshToken } from '../../actions/auth-action'
import { API_URL } from '../../setting';
import { Tweet } from '../../components/tweet/Tweet';
import { TweetCreate } from '../../components/tweet/TweetCreate';
import styled from 'styled-components'

function Feed() {
  const [feed, setFeed] = useState([])
  const [ authToken , dispatch ] = useStateValue()
  
  const addTweet = (tweet) => {
    const newFeed = feed.slice()
    newFeed.unshift(tweet)
    setFeed(newFeed)
  }

  useEffect(() => {
    const fetchAPI = async () => {
      const myHeaders = new Headers();
      if(authToken){
        const updatedToken = await refreshToken(authToken.refresh)
        if (updatedToken.status === 401) {
          dispatch({
            type:'DISCONECT'
          })
        }else{
          dispatch({
            type:'REFRESH',
            item: updatedToken.access
          })
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
    <Container>
      {authToken && <TweetCreate addTweet={addTweet}/> }

      { feed.map(tweet=><Tweet key={tweet.id} tweetid={tweet.id} numlike= { tweet.numlike } likeornot={tweet.likeornot} author={ tweet.author } picture={tweet.picture} content={tweet.content} />)}
    </Container>
  )
}

const Container = styled.main`
  width:700px;
  background-color:#65fcc2;
  box-shadow:  6px 6px 14px #56d6a5,
    -6px -6px 14px #74ffdf;
  margin:40px auto;
  padding:50px;
`

export default Feed;
