import { useRef } from 'react';
import styled from 'styled-components'
import {AddAPhoto, AddLocation} from '@material-ui/icons'

export function InputFile({handlePicture, name}) {
  const fileRef = useRef(null)
  return (
    <File>
      <label htmlFor="shareimage">
        <AddAPhoto/>
      </label>
      <input type="file" onChange={()=>{handlePicture(fileRef.current.files[0])}} ref={fileRef}  name={ name } id="shareimage" />
    </File>
  );
}
const File = styled.span`
  color:teal;

  & input{
    display:none;
  }
`

export function InputLocation() {
  return (
    <Location>
      <label htmlFor="sharelocation">
        <AddLocation/>
      </label>
      <input type="file" name="location" id="sharelocation" />
    </Location>
  );
}
const Location = styled.span`
  color:teal;

  & input{
    display:none;
  }
`

