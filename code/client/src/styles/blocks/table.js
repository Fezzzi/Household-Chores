import styled from 'styled-components';

export const TableBox = styled.div`
  max-height: 420px;
  height: max-content;
  overflow: auto;
  margin: 0 50px;
  min-width: 550px;
`;

export const TableHeaderBox = styled.div`
  height: 32px;
  border-bottom: 1px solid var(--cBorder);
  margin-bottom: 10px;
  display: flex;
`;

export const TableHeaderCell = styled.div`
  padding: 0 6px;
  display: flex;
  line-height: 32px;
  font-size: 1.1em;
  
  ${props => props.growing ? 'margin-right: auto' : 'flex-shrink: 0'};
`;

export const TableRow = styled.div`
  padding: 5px 6px;
  display: flex;
`;

export const TableCell = styled.div`
  display: flex;
  line-height: 20px;
  color: var(--cFont);
  font-weight: ${props => props.boldKey ? 700 : 400};
  font-size: ${props => props.boldKey ? 1.1 : props.fadeKey ? 0.9 : 1}em;
  opacity: ${props => props.fadeKey ? 0.6 : 1};
  margin-left: 2px;
  margin-right: 6px;
  
  ${props => props.growing ? 'margin-right: auto' : 'flex-shrink: 0'};
`;

export const TablePhoto = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  object-fit: cover;
`;

export const TableSorterIcon = styled.span`
  height: 22px;
  width: 22px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 5px;
  opacity: ${props => props.selected ? 1 : .8};
  color: var(--${props => props.selected ? 'cBluePrimary' : 'cFont'});
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;
