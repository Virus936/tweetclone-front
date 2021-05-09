import React, {useState, useEffect} from 'react';
import  useAuthToken from '../../customHook/useToken';
import styles from './Feed.module.css';

const Tweet = ({author, content}) => { 
  return <div className={styles.Tweet}>
      <h2>{author}</h2>
      <div>
        <p>{content}</p>
      </div>
    </div> 
}

const NewTweet = () => {

  const [authToken, setAuthToken] = useAuthToken('')
  const handleSubmit = e => {
    e.preventDefault()

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+authToken.access);
    let formdata = new FormData(e.target);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8000/api/tweets/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return <form className={styles.FormTweet} onSubmit={handleSubmit}>
      <input name='content' type="text" placeholder="tweeter ici" />
    <input type="submit" value="Envoyer" />
    </form>
}

function Feed() {
  const FeedAPI = "http://localhost:8000/api/tweets"
  const [feed, setFeed] = useState([])

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(FeedAPI, requestOptions)
      .then(res => res.json())
      .then(res => setFeed(res))
  }, [])

  return (
    <div className={styles.Feed}>
      <NewTweet />

      { feed.map( (tweet) => <Tweet key={tweet.id} author={tweet.author} content={tweet.content} />  )  }
    </div>
  )
}

export default Feed;
