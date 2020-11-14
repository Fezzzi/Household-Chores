import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: rgba(37, 37, 37, 0.6);
  display: flex;
`;

export const ModalBody = styled.div`
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  width: ${props => props.width ?? 'max-content'};
  height: ${props => props.height ?? 'max-content'};
  display: flex;
  flex-flow: column;
  margin: auto;
  position: relative;
  margin: 50px auto;
  padding: 25px;
`;

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
`;

export const ModalButtonsBlock = styled.div`
  width: 100%;
  padding-top: 15px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

export const ModalNote = styled.p`
  text-align: center;
  font-size: 0.9em;
  margin: 0;
  user-select: none;
`;

export const ModalPhotoControls = styled.div`
  display: flex;
`;

export const ModalPhotoWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin: 50px;
  display: flex;
  flex-flow: row;
`;

export const ModalPhotoCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  
  :hover {
    cursor: grab;
  }
`;

export const ModalPhotoSliderWrapper = styled.div`
  width: 25px;
  height: 250px;
  display: flex;
  position: relative;
  flex-flow: row;
`;

export const ModalPhotoSlider = styled.input`
  height: 8px;
  width: 198px;
  background: var(--cThemeBack);
  border: 1px solid var(--cBorder);
  transform: rotate(90deg);
  appearance: none;
  left: -90px;
  top: 118px;
  position: absolute;
  
  :focus, :active {
    outline: none;
  }
  
  ::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 20px;
    background: var(--cBluePrimary);
    border-radius: 0;
  }
  
  ::-moz-range-thumb {
    appearance: none;
    width: 10px;
    height: 20px;
    background: var(--cBluePrimary);
    border-radius: 0;
  }
`;

export const PhotoSizeValue = styled.span`
  color: ${props => props.isOk ? 'var(--cGreenPrimary)' : 'var(--cRedPrimary)'}
`;
