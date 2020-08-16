import styled from 'styled-components';

export const SettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  padding: 15px 0 15px 20px;
`;

export const SettingsColumnWrapper = styled.div`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  height: 100%;
  display: table-col;
  margin-right: 20px;
  color: var(--cFont);
`;

export const SettingIcon = styled.div`
  margin-right: 10px;
  display: inline-block;
  top: 3px;
  position: relative;
  
  & svg {
    height: 20px;
  }
`;

export const SettingText = styled.div`
  font-size: ${props => props.primary ? 1.17 : 1.10}em;
  line-height: ${props => props.primary ? 1.17 : 1.10}em;
  display: inline-block;
`;

export const SettingsColumn = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cThemeFront);
  padding-top: 14px;
  margin: 14px 0;
`;

export const SettingRow = styled.div`
  margin: 0 14px 14px 14px;
  opacity: ${props => props.selected ? 1 : 0.6};
  font-weight: ${props => props.selected ? 600 : 400};
  font-size: ${props => props.primary ? 1.17 : 1.10}em;
  line-height: ${props => props.primary ? 1.17 : 1.10}em;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
    font-weight: 600;
  }
`;

export const ContentColumn = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 14px;
  margin: 14px 20px;
`;
