import React, {useState, useEffect, useRef} from 'react';
import styles from './TweetCreate.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, postTweet} from '../../actions/auth-action'
import { API_URL } from '../../setting';
import { Tweet } from './Tweet';

export const TweetCreate = ({addTweet}) => {

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
