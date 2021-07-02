import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import { RssFeed, Group, Chat, YouTube, Book } from '@material-ui/icons';

function LeftSide(){
  return(
    <Container>
      <SidebarItem icon={<RssFeed/>} content="Feed"/>
      <SidebarItem icon={<Group/>} content="Chats"/>
      <SidebarItem icon={<Chat/>} content="Videos"/>
      <SidebarItem icon={<YouTube/>} content="Group"/>
      <SidebarItem icon={<Book/>} content="Bookmarks"/>
      <hr />
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Superman"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Batman"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Spiderman"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Wonder Wooman"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Black Widow"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Arya Stark"/>
      <SidebarItem icon={<FriendPicture src='assets/person/default.png'/>} content="Albert Einstein"/>

    </Container>
    )
}

const FriendPicture = styled.img`
  width:32px;
  height:32px;
  border-radius:50%;
`
const Container = styled.aside`
  position:sticky;
  justify-self:end;
  overflow-y:scroll;
  scrollbar-color: transparent transparent;
  top:50px;
  padding:30px;
  height:calc(100vh - 50px);
  color:teal;

`

export default LeftSide
