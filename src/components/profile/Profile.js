import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import {useStateValue} from '../../context/logContext'
import {refreshToken, updateProfile} from '../../actions/auth-action'
import { API_URL } from '../../setting';

function Profile() {
  const [ authToken, dispatch ]= useStateValue()
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState("")
  const [resume, setResume] = useState('')
  const [picture, setPicture] = useState("")


  const fetchData = async () => {
    if (!authToken) {
      window.location = `/login`
    }
    const updatedToken = await refreshToken(authToken.refresh)
    if (updatedToken.status === 401) {
      dispatch({
        type:'DISCONECT'
      })
      window.location = `/login`
    }
    dispatch({
      type:'REFRESH',
      item: updatedToken.access
    })

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authToken.access}`)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let profile = await fetch(`${API_URL}/profile`, requestOptions)
    profile = await profile.json()
    
    setUsername(profile.username)
    setFirstname(profile.first_name)
    setLastname(profile.last_name)
    setResume(profile.profile.desc)
    setPicture(profile.profile.pp)
  }

  useEffect(() => {
   fetchData() 
      }, [])
  const submitProfile = async e => {
   e.preventDefault() 
      const updatedToken = await refreshToken(authToken.refresh)
      dispatch({
        type:'REFRESH',
        item: updatedToken.access
      })

    console.log(updatedToken)
    await updateProfile(e.target, authToken.access)
  }

  return (
    <form className={styles.Profile} onSubmit={submitProfile}>
      <div className={styles.picture}>
        <img src={picture} alt="a" />
        <input type="file" name="profile.pp" />
      </div>
      <div className="username">
        <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} placeholder="username" />
      </div>
      <div className="desc">
        <textarea name="profile.desc" value={resume} cols="30" onChange={e => setResume(e.target.value)} rows="10" placeholder="description"></textarea>
      </div>
      <div className="name">
        <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} name="first_name" placeholder="prénom"/>
        <input type="text" value={lastname} onChange={ e => setLastname(e.target.value) } name="last_name" placeholder="nom"/>
      </div>
      <div className={styles.submit}>
        <input type="submit" value="Valider" />
      </div>
    </form>
  );
}


export default Profile;
