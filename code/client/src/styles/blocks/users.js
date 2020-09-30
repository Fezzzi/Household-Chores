import styled from 'styled-components';

export const UserList = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: ${props => props.size ?? 420}px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const UserNode = styled.div`
  display: inline-flex;
  width: ${props => props.size ?? 420}px;
  min-width: ${props => props.size ?? 420}px;
  min-height: 100px;
  padding: 10px;
`;

export const UserPhotoBox = styled.div`
  display: inline-block;
`;

export const UserPhoto = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 10px;
`;

export const UserInfoBox = styled.div`
  display: inline-block;
  width: 100%;
`;

export const UserName = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 1.4em;
  margin: 10px 0;
`;

export const AppendMessage = styled.div`
  display: block;
  width: 100%;
  opacity: ${props => props.reactive ? '0.6' : '0.8'};
  font-weight: ${props => props.reactive ? 300 : 400};
  font-size: 1.1em;
  word-break: break-all;
  
  ${props => props.reactive && `
    &:hover {
      cursor: pointer;
      font-weight: 400;
      opacity: 0.8;
    }`
}
`;

export const UserButtonsBox = styled.div`
  width: 100%;
  margin-top: 5px;
  font-size: 14px;
`;

export const InvitationBox = styled.div`
  display: flex;
`;

export const UserNodeSeparator = styled.div`
  display: inline-flex;
  margin: auto;
`;
