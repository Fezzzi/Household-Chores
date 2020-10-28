import styled from 'styled-components';

export const MiniInputWrapper = styled.div`
  background: var(--cThemeBack);
  align-items: center;
  border: 1px solid var(--${props => props.active ? 'cBorderActive' : 'cBorder'});
  border-radius: 3px;
  box-sizing: border-box;
  color: var(--cFont);
  font-size: 14px;
  position: relative;
  max-width: 400px;
  display: inline-flex;
  flex-direction: row;
  height: 29px;
  
  &input {
    font-size: .9em;
  }
`;

export const EditableFieldWrapper = styled.div`
  position: relative;
  max-width: 100%;
  
  :hover {
    cursor: pointer;
  }
`;

export const EditableFieldIcon = styled.div`
  position: absolute;
  top: -10px;
  right: ${props => props.iconRight ?? -22}px;
  width: 15px;
  height: ${props => props.centered ? '100%' : '15px'};
  color: var(--cFont);
  opacity: .4; 
  
  svg {
    width: 100%;
    height: 100%;
  }
`;
