import {ReactComponent as Logo} from './logo.svg'
import {ReactComponent as Logout} from './logout.svg'
import {useStateValue} from '../../context/logContext'
import styled from 'styled-components'

import { Link } from "react-router-dom";

const Log = ({onClick}) => {
  const [ authToken, dispatch ]= useStateValue()

  const disconect = () => {
    dispatch({
      type:'DISCONECT'
    })
  }
  return (
    <div className="Log">
      <Link className='link' to="/login" onClick={disconect} >
        {authToken?<Logout  className="link" fill='lightyellow'style={{width:'40px', height:'40px' }}/>:'Login' }
      </Link>
      {!authToken&& <Link className="link" to='/register'>
        Register
      </Link>
      }
    </div>
  )
}


function Header({ logout }) {

  return (
    <Container  >
      <Link to="/">
        <Logo fill='lightyellow' style={{width:'40px', height:'40px' }} />
      </Link>
      <Link className="link" to="/">
        <h1>TweetFarmer</h1>
      </Link>
      <Log />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  background-color:DarkOliveGreen;
  padding:20px 60px;
  color: lightyellow;
  font-family: "lobster";
  gap:12px;
  align-items: center;
  
  & .link{
    text-decoration:none;
    color:lightyellow
  }
  & .Log{
    display:flex; 
    flex-direction: row;
    gap:12px;
    margin-left: auto;
    font-family: Helvetica,Arial,sans-serif;
    text-decoration: none;
    color:lightyellow
  }
`

export default Header;


