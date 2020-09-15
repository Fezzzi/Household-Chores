import styled from 'styled-components';

export const HoverTooltip = styled.div`
  top: -3px;
  right: 110%;
  width: max-content;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  position: absolute;
  border-radius: 4px;
  padding: 4px 6px;
  z-index: 1;
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border: 5px solid;
    border-color: transparent transparent transparent var(--cBorder);;
  }
`;
