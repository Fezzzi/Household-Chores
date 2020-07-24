import styled from 'styled-components';

export const NotificationsBlock = styled.div`
  position: fixed;
  top: 50px;
  right: 50px;
  z-index: 1100;
  overflow-y: hidden;
  list-style: none;
  margin: 0px auto;
`;

export const NotificationWrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
  min-height: 60px;
  margin-bottom: 14px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 0px;
  color: var(--cFont);
  z-index: 10;
  background: var(--cThemeFront);
  border-radius: 2px;
  transition: all 0.5s ease 0s;
  overflow: hidden;
  padding: 10px;
`;

export const NotificationIconBlock = styled.div`
  position: relative;
  display: block;
  width: 60px;
  height: 60px;
`;

export const NotificationIconWrapper = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  top: 19px;
  left: 19px;
  display: flex;
  fill: ${props => props.iconColor};
  stroke: ${props => props.iconColor};
  border-radius: 10px;
  box-sizing: border-box;

  & > svg {
    margin: auto;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  width: 220px;
  padding-right: 10px;
  margin: 0px;
`;

export const NotificationMessage = styled.p`
  margin: 0px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`;

export const NotificationClose = styled.div`
  cursor: pointer;
  opacity: 0.6;
  position: relative;
  display: flex;
  width: 20px;
  font-size: 14px;
  fill: var(--cBorder);
  transition: opacity 0.1s ease 0s;

  &:hover {
    fill: var(--cBorderActive);
  }
`;
