import styled from 'styled-components';

export const SettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  padding: 15px 0;
`;

export const SettingsColumn = styled.div`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  height: 100%;
  display: table-col;
  border-right: 1px solid var(--cBorder);
`;

export const SettingRow = styled.div`
  margin: 14px 20px;
  text-align: center;
  color: var(--cFont);
  opacity: ${props => props.selected ? 1 : 0.6};
  font-weight: ${props => props.selected ? 600 : 400};
  font-size: ${props => props.primary ? 1.17 : 1.10}em;
  line-height: ${props => props.primary ? 1.30 : 1.23}em;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
    font-weight: 600;
  }
`;

export const ContentColumn = styled.div`
  width: 100%;
  height: 100%;
  margin: 14px 20px;
`;
