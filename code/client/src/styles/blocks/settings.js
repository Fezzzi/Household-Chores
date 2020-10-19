import styled from 'styled-components';

export const SettingsWrapper = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
  display: flex;
  padding: 15px 0 15px 20px;
`;

export const ColumnWrapper = styled.div`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  height: calc(100% - 30px);;
  display: table-col;
  margin-right: 10px;
  color: var(--cFont);
`;

export const SettingIcon = styled.div`
  margin-right: 10px;
  display: inline-block;
  top: 4px;
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

export const Column = styled.div`
  width: 100%;
  max-height: calc(100% - 58px);
  overflow-y: auto;
  background-color: var(--cThemeFront);
  padding: 14px 0 4px;
  margin: 14px 0;
  user-select: none;
  border: 1px solid var(--cBorder);
`;

export const SettingRow = styled.div`
  padding: 0 14px 14px 14px;
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
  min-height: calc(100% - 58px);
  max-height: calc(100% - 58px);
  background-color: var(--cThemeFront);
  padding: 14px;
  margin: 14px 20px 14px 0;
  border: 1px solid var(--cBorder);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const IconButtonWrapper = styled.div` 
  display: inline-block;
  float: right;
`;

export const IconButton = styled.button`
  width: 38px;
  height: 38px;
  position: relative;
  padding: 8px;
  background-color: var(--cThemeFront);
  border: 1px solid var(--${props => props.active ? 'cBorderActive' : 'cBorder'});
  border-radius: 1px;
  
  &:hover {
    cursor: pointer;
  }
  
  &:active, &:focus {
    outline: none;
    border: 1px solid var(--cBorderActive);
  }
  
  & > svg {
    fill: var(--cFont);
    stroke: none;
    width: 20px;
    height: 20px;
  }
`;

export const LocaleSelector = styled.div`
  position: absolute;
  width: 71px;
  height: fit-content;
  left: -1px;
  bottom: 40px;
  padding-top: 8px;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  border-radius: 1px;
`;

export const LocaleLine = styled.div`
  padding: 0 8px 8px 8px;
  width: calc(100% - 16px);
  height: 23px;
`;

export const LocaleIcon = styled.span`
  width: 22px;
  height: 22px;
  display: inline-block;
  float: left;
`;

export const LocaleLabel = styled.span`
  line-height: 23px;
  font-weight: 600;
  float: right;
  font-size: 13px;
  color: var(--cFont);
`;

export const SectionHeadline = styled.h2`
  font-size: 2em;
  font-weight: 700;
  margin: 50px 50px 25px;
  text-transform: capitalize;
`;
