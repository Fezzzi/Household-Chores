import styled from 'styled-components'

export const UserList = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: ${props => props.size ?? 420}px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  display: flex;
`

export const UserNode = styled.div`
  display: flex;
  width: 135px;
  flex-flow: column;
  min-height: 100px;
  padding: 20px 10px 5px;
`

export const UserPhotoBox = styled.div`
  display: inline-block;
  position: relative;
`

export const UserPhotoMoreBox = styled.div`
  position: absolute;
  top: 0;
  left: 5px;
  display: flex;
  flex-flow: column;
`

export const UserPhoto = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 10px auto;
  display: block;
`

export const MiniUserPhoto = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

export const UserInfoBox = styled.div`
  display: inline-block;
  position: relative;
`

export const UserButtonsBox = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: 15px;
  font-size: 14px;
`

export const UserFloatingNameBox = styled.div`
  position: absolute;
  top: -22px;
`

export const UserName = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 1.4em;
  text-align: center;
  line-height: 1.4em;
`

export const UserMutualFriends = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 0.9em;
  opacity: 0.6;
  text-align: center;
  line-height: 0.9em;
`

export const MiniUserName = styled.div`
  width: max-content;
  font-weight: 500;
  font-size: 1.1em;
  margin: 5px 0;
`

export const AppendMessageAnchor = styled.div`
  margin: 7px 0;
`

export const AppendMessageIcon = styled.div`
  opacity: 0.6;
  height: 20px;
  width: 20px;
  
  > svg {
    margin-top: 2px;
    width: 100%;
    height: 100%;
  }
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`

export const AppendMessage = styled.div`
  display: block;
  width: 100%;
  opacity: '0.8';
  font-weight: 400;
  font-size: 1.1em;
  word-break: break-all;
`

export const WrapperBox = styled.div`
  display: flex;
  overflow: hidden;
  align-self: flex-start;
  justify-self: flex-start;
`
