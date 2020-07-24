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
