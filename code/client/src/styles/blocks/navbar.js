import styled from 'styled-components';

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  position: relative;
  padding: 8px;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  border-radius: 1px;
  
  &:hover {
    cursor: pointer;
  }
  
  &:active {
    border: 1px solid var(--cBorder);
    outline: none;
  }
  
  &:focus {
    border: 1px solid var(--cBorder);
    outline: none;
  }
  
  & > svg {
    fill: var(--cFont);
    stroke: none;
  }
`;

export const LocaleSelector = styled.div`
  position: absolute;
  width: 55px;
  height: fit-content;
  left: -1px;
  bottom: 40px;
  padding: 8px;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  border-radius: 1px;
`;

export const LocaleLine = styled.div`
  width: 100%;
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
