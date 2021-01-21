import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(37, 37, 37, 0.6);
  display: flex;
`

export const ModalBody = styled.div`
  background-color: ${props => props.background ?? COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  width: ${props => props.width ?? 'max-content'};
  height: ${props => props.height ?? 'max-content'};
  display: flex;
  flex-flow: column;
  position: relative;
  margin: ${props => props.margin ?? '75px auto'};
  padding: 25px;
`

export const ModalCloseButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -15px;
  left: -15px;
  opacity: .8;
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
  
  > svg {
    height: 100%;
    width: 100%;
  }
`

export const ModalButtonsBlock = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`

export const ModalHeadline = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

export const ModalMessage = styled.h3`
  text-align: center;
  margin: 0 0 25px;
`

export const ModalNote = styled.div`
  text-align: center;
  font-size: 0.9em;
  margin: 0 auto;
  opacity: 0.6;
  user-select: none;
  width: fit-content;
`

export const ModalPhotoControls = styled.div`
  display: flex;
`

export const ModalPhotoWrapper = styled.div`
  width: 250px;
  height: 250px;
  margin: 20px;
  display: flex;
  flex-flow: row;
`

export const ModalPhotoCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  
  :hover {
    cursor: grab;
  }
`

export const ModalPhotoSliderWrapper = styled.div`
  width: 25px;
  height: 250px;
  display: flex;
  position: relative;
  flex-flow: row;
`

export const ModalPhotoSlider = styled.input`
  height: 8px;
  width: 248px;
  background: ${COLORS.THEME_BACK};
  border: 1px solid ${COLORS.BORDER};
  transform: rotate(90deg);
  appearance: none;
  left: -120px;
  top: 138px;
  position: absolute;
  
  :focus, :active {
    outline: none;
  }
  
  ::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 20px;
    background: ${COLORS.BLUE_PRIMARY};
    border-radius: 0;
  }
  
  ::-moz-range-thumb {
    appearance: none;
    width: 10px;
    height: 20px;
    background: ${COLORS.BLUE_PRIMARY};
    border-radius: 0;
  }
`

export const PhotoSizeValue = styled.span`
  color: ${props => props.isOk ? COLORS.GREEN_PRIMARY : COLORS.RED_PRIMARY}
`
