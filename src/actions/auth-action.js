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
  updatedToken =  updatedToken.json()
  return  updatedToken
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

