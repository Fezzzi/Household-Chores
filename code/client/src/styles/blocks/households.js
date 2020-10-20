import styled from 'styled-components';

export const HouseholdHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  padding: 0 50px;
  flex-direction: column;
  min-width: 550px;
  position: relative
`;

export const HouseholdPhoto = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
  display: flex;
  border-radius: 100%;
`;

export const HouseholdTitle = styled.h1`
  font-weight: 800;
  font-size: 2.2em;
  display: flex;
  margin: 15px 5px;
`;

export const HouseholdSubtitle = styled.div`
  opacity: 0.6;
  font-size: 0.9em;
  display: flex;
`;

export const CriticalButtonsBlock = styled.div`
  position: absolute;
  right: 50px;
  top: 0;
  width: max-content;
  
  button {
    opacity: 0.4;
  }
  
  button:hover {
    opacity: 1;
  }
`;

export const ButtonIconSpan = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 3px;
  overflow: hidden;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CurrentUserBlock = styled.div`
  position: absolute;
  left: 50px;
  top: 0;
  justify-content: center;
  align-items: center;
  width: 175px;
`;

export const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 100%;
  display: flex;
`;

export const UserName = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 1.5em;
  display: flex;
  width: fit-content;
  padding: 10px;
  word-break: break-all;
`;

export const RoleLabel = styled.div`
  background-color: ${props => props.background};
  color: ${props => props.color};
  padding: 0 8px;
  border-radius: 3px;
  text-transform: lowercase;
  width: fit-content;
  line-height: 20px;
  height: 20px;
  margin: 0 auto;
`;

export const InvitationNodesWrapper = styled.div`
  width: max-content;
`;

export const InvitationFormNode = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 5px 3px;
`;

export const InvitationFormNodePhoto = styled.img`
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 100%;
  display: flex;
`;

export const InvitationFormNodeName = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 1.4em;
  display: flex;
  width: fit-content;
  padding: 10px;
  word-break: break-all;
`;
