import styled from 'styled-components'

function SidebarItem({icon, content}){
  return(
    <Container>
      {icon}
      <p>{content}</p>
    </Container>
    )
}
const Container = styled.div`
  display:flex;
  align-items:center;
  gap:5px;
  margin:10px;
  &:hover{
    color:firebrick;
  }
  & *{
  cursor:pointer;
  }
`

export default SidebarItem
