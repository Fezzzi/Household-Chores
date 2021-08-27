import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'

export const TableBox = styled.div`
  margin: 0 50px;
  min-width: 550px;
  opacity: ${props => props.disabled ? 0.4 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`

export const TableHeaderBox = styled.div`
  height: ${props => props.isBigger ? 42 : 32}px;
  border-bottom: 1px solid ${COLORS.BORDER};
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
  max-height: ${props => props.freeHeight ? '100%' : '270px'};
  overflow: auto;
`

export const TableRow = styled.div`
  padding: 5px 6px;
  display: flex;
  ${props => props.strikethrough && `
    text-decoration: line-through;

    > * img {
      filter: opacity(0.5);
    }
  `}
`

export const TableRowIcon = styled.span`
  color: ${props => props.color || COLORS.FONT};
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

// inline-block display style is required for child element to be able to override parent's line-through style
export const TableCell = styled.div`
  position: relative;
  display: inline-block;
  line-height: 20px;
  height: 20px;
  color: ${COLORS.FONT};
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

// inline-block display style is required for child element to be able to override parent's line-through style
export const TableBigCell = styled.div`
  position: relative;
  display: inline-block;
  line-height: 35px;
  height: 35px;
  color: ${COLORS.FONT};
  font-weight: ${props => props.boldKey ? 700 : 400};
  font-size: ${props => props.boldKey ? 1.1 : props.fadeKey ? 0.9 : 1}em;
  opacity: ${props => props.fadeKey ? 0.6 : 1};
  margin-left: 2px;
  margin-right: 6px;
  
  ${props => props.growing ? 'margin-right: auto' : 'flex-shrink: 0'};
  
  svg {
    height: 35px;
  }
`

export const TablePhoto = styled.img`
  width: 20px;
  height: 20px;
  
  border-radius: 100%;
  object-fit: cover;
`

export const TableBigPhoto = styled.img`
  width: 35px;
  height: 35px;
  
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
  color: ${props => props.selected ? COLORS.BLUE_PRIMARY : COLORS.FONT};
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`
