import React, {useState, useEffect, useRef} from 'react';
import styles from './TweetCreate.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, postTweet} from '../../actions/auth-action'
import { API_URL } from '../../setting';
import { Tweet } from './Tweet';
import styled from 'styled-components'
import { InputFile, InputLocation } from '../ShareAction';

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
    const handle2 = e => setPicture(URL.createObjectURL(e))


  return (
    <>
      <FormTweet  onSubmit={handleSubmit}>
        <textarea  name="content" value={content} onChange={ (e) => setContent(e.target.value) } cols="30" rows="10" placeholder='tweeter ici'></textarea>
        <div className='shareaction'>
          <InputFile handlePicture={handle2} name="picture"/> 

          <InputLocation />
          <input type="submit" value="Envoyer" />

        </div>
      </FormTweet>
      {(content || picture )&& <Tweet content={content} picture={picture}  /> }
    </>)
}


const FormTweet = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  margin:20px;
  padding: 20px;
  border-radius:10px;
  border: solid;
  background-color: LightGoldenrodYellow;

  & textarea{
    resize:none;
    focus:none;
    border : none;
    color:green;
    font-size: 1rem;
    background-color: transparent;
    width:80%;
    outline:none;
  }
 

  & input[type=submit]{
    border-radius:20px;
    padding: 10px;
    border:solid 2px green ;
    background-color: rgb(0, 156, 98);
    color:#fff;
    font-weight: bold;
  }
  & .shareaction{
    display:flex;
    justify-content:space-around;
    width:100%;
  }
`
