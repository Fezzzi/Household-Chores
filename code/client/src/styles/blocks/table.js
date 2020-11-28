import styled from 'styled-components'

export const TableBox = styled.div`
  margin: 0 50px;
  min-width: 550px;
`

export const TableHeaderBox = styled.div`
  height: ${props => props.isBigger ? 42 : 32}px;
  border-bottom: 1px solid var(--cBorder);
  margin-bottom: 10px;
  display: flex;
`

export const TableHeaderCell = styled.div`
  padding: 0 6px;
  display: flex;
  line-height: 32px;
  font-size: 1.1em;
  
  ${props => props.growing ? 'margin-right: auto' : 'flex-shrink: 0'};
`

export const TableSingleRowBox = styled.div`
  height: ${props => props.height};
  max-height: ${props => props.height};
  overflow-x: auto;
`

export const TableRowsBox = styled.div`
  height: max-content;
  max-height: 270px;
  overflow: auto;
`

export const TableRow = styled.div`
  padding: 5px 6px;
  display: flex;
`

export const TableRowIcon = styled.span`
  color: ${props => props.color || 'var(--cFont)'};
  opacity: ${props => props.clickable ? 0.6 : 0.8};
  
  ${props => props.clickable && `
    :hover {
      cursor: pointer;
      opacity: 1;
    }
    
    :focus, :active {
      opacity: 0.9;
    }
  `}
`

export const TableCell = styled.div`
  display: flex;
  line-height: 20px;
  height: 20px;
  color: var(--cFont);
  font-weight: ${props => props.boldKey ? 700 : 400};
  font-size: ${props => props.boldKey ? 1.1 : props.fadeKey ? 0.9 : 1}em;
  opacity: ${props => props.fadeKey ? 0.6 : 1};
  margin-left: 2px;
  margin-right: 6px;
  
  ${props => props.growing ? 'margin-right: auto' : 'flex-shrink: 0'};
  
  svg {
    height: 20px;
  }
`

export const TablePhoto = styled.img`
  width: 20px;
  height: 20px;
  
  border-radius: 100%;
  object-fit: cover;
`

export const TableSorterIcon = styled.span`
  height: 22px;
  width: 22px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 5px;
  opacity: ${props => props.selected ? 1 : 0.8};
  color: var(--${props => props.selected ? 'cBluePrimary' : 'cFont'});
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`
