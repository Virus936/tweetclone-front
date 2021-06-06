import { API_URL } from '../setting';

export const refreshToken = async refresher => {
  let refreshform = new FormData();
  refreshform.append("refresh",refresher);

  let refreshOption = {
    method: 'POST',
    body: refreshform,
    redirect: 'follow'
  };
  let updatedToken = await fetch(`${API_URL}/auth/login/refresh/`, refreshOption)
  if (updatedToken.ok) {
    updatedToken =  updatedToken.json()
  }
    return updatedToken
}

export const postTweet = async ( formTweet , access) => {
  
  let myHeaders = new Headers();
  myHeaders.append( "Authorization", `Bearer ${access} `);
  let formdata = new FormData(formTweet);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  const newtweet = await fetch(`${API_URL}/api/tweets/`, requestOptions)
  return newtweet.json()
}

export const updateProfile = async ( formTweet , access) => {
  
  let myHeaders = new Headers();
  myHeaders.append( "Authorization", `Bearer ${access} `);
  let formdata = new FormData(formTweet);

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  console.log(formTweet)

  console.log(formdata)

fetch("http://localhost:8000/profile/", requestOptions)




  
}

