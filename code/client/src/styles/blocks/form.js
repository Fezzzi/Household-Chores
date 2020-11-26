import styled from 'styled-components';

import FacebookIcon from '~/static/social/facebook-icon-white.png';
import GoogleIcon from '~/static/social/google-icon.svg';

export const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  padding: 0 50px;
  flex-direction: column;
  min-width: 550px;
  position: relative
`;

export const FormHeaderPhoto = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
  display: flex;
  border-radius: 100%;
`;

export const FormHeaderTitle = styled.h1`
  font-weight: 800;
  font-size: 2.2em;
  display: flex;
  margin: 15px 5px 0;
  justify-content: center;
  align-content: center;
  
  > * input {
    width: 250px;
  }
`;

export const FormHeaderLeftPanel = styled.div`
  position: absolute;
  left: 50px;
  top: 0;
`;

export const FormHeaderRightPanel = styled.div`
  position: absolute;
  right: 50px;
  top: 0;
`;

export const InputRow = styled.div`
  margin: 0 ${props => props.fixedPadding ? '42px' : 'auto'} 6px;
  position: relative;
  min-height: 38px;
`;

export const FixedInputBlock = styled.div`
  margin-right: 20px;
  position: relative;
  min-height: 38px;
  max-width: ${props => props.maxWidth ?? 400}px;
  width: fill-available;
  display: inline-block;
  vertical-align: top;
`;

export const InputWrapper = styled.div`
  background: var(--cThemeBack);
  align-items: center;
  border: 1px solid var(--${props => props.active ? 'cBorderActive' : 'cBorder'});
  border-radius: 3px;
  box-sizing: border-box;
  color: var(--cFont);
  font-size: 14px;
  position: relative;
  width: 100%;
  max-width: 400px;
  display: inline-flex;
  flex-direction: row;
`;

export const TextInputBox = styled.label`
  height: ${props => props.lineHeight ?? 36}px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  font-weight: 400;
  flex: 1 0 0;
  display: flex;
`;

export const TextInputLabel = styled.span`
  color: var(--cGreyPrimary);
  font-size: 12px;
  height: ${props => props.lineHeight ?? 36}px;
  left: 8px;
  line-height: ${props => props.lineHeight ?? 36}px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform-origin: left;
  right: 0;
  user-select: none;
  transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  
  ${props => props.shrunken && (props.miniInput
    ? { display: 'none' }
    : { transform: 'scale(.83333) translateY(-13px)' }
  )}
`;

export const TextInputField = styled.input`
  background: var(--cThemeBack);
  color: var(--cFont);
  overflow: hidden;
  padding: ${props => props.shrunken && !props.miniInput ? '12px 8px 2px' : '9px 8px 7px'};
  text-overflow: ellipsis;
  margin: 0;
  border: 0;
  width: 100%;
  
  &:active, &:focus {
    outline: 0;
  }
`;

export const InputSiderWrapper = styled.div`
  align-items: center;
  height: 100%;
  margin-right: 8px;
  vertical-align: middle;
  display: flex;
`;

export const ShowPassWrapper = styled.div`
  margin-left: 8px;
  align-items: stretch;
`;

export const ShowPassButton = styled.button`
  outline: 0;
  border: 0;
  background-color: transparent;
  color: var(--cFont);
  display: inline;
  padding: 0;
  position: relative;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  user-select: none;
  width: auto;
  
  &:active {
    opacity: .7;
  };
`;

export const PhotoInputWrapper = styled(InputWrapper)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: auto;
  display: flex;
  margin-bottom: ${props => props.size / 8}px;
`;

export const PaddedInputWrapper = styled.div`
  position: relative;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  border-radius: 1px;  
  box-sizing: border-box;
  display: inline-block;
  float: right;
`;

export const BoolInputBox = styled.label`
  height: 36px;
  width: 36px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
  color: var(--cGreenPrimary);
  background-color: var(--cThemeBack);
  
  &:hover {
    color: var(--cGreenSecondary);
    cursor: pointer;
  }
`;

export const BoolInputLabel = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  user-select: none;
  
  & svg {
    height: 100%;
    width: 26px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
`;

export const BoolInputField = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: 0;
  
  &:active, &:focus {
    outline: 0;
  }
`;

export const FileInputBox = styled.label`
  height: 100%;
  width: 100%;
  position; relative;
  display: flex;
  padding: 0;
  margin: 0;
  min-width: 0;
  
  &:hover svg {
    color: var(--cBlueSecondary);
  }
  
  &:active svg {
    opacity: .7;
  }
`;


export const FileInputLabel = styled.div`
  width: 100%;
  user-select: none;
  display: flex;
  flex-flow: column;
  text-align: center;
  align-self: center;
  
  & svg {
    margin: auto;
    font-size: 50px;
    color: var(--cBluePrimary);
  }
`;

export const FileInputField = styled.input`
  background: var(--cThemeBack);
  color: var(--cFont);
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  flex: 1 0 auto;
  
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: 0;

  &:hover {
    cursor: pointer;
  }

  &:active, &:focus {
    outline: 0;
  }
`;

export const FileInputPreview = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('${props => props.file}')
`;

export const FileImagePreview = styled.img`
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

export const SwitchInputBox = styled.label`
  height: 36px;
  width: fit-content;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
  background-color: var(--cThemeBack);
`;

export const SwitchInputLabel = styled.div`
  display: flex;
  height: 100%;
  user-select: none;
`;

export const SwitchInputValue = styled.span`
  display: flex;
  flex-flow: row;
  font-size: 1em;
  padding: 0 15px;
  height: 100%;
  align-items: center;
  text-transform: uppercase;
  ${props => props.selected
    ? `
      background-color: var(--cGreenSecondary);
      color: var(--cThemeFront);
      opacity: 1;
      font-weight: 500;
    ` : `
      opacity: 0.5;
      
      :hover {
        cursor: pointer;
      }
    `
}
  
  :not(:last-child) {
    border-right: 1px solid var(--cBorder);
  }
`;

export const SwitchInputField = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: 0;
  
  &:active, &:focus {
    outline: 0;
  }
`;

export const FormButtonWrapper = styled.div`
  margin: ${props => props.margin};
  display: ${props => props.inline ? 'inline-block' : 'block'};
  min-width: 100px;
  align-content: stretch;
`;

export const FormButton = styled.button`
  border: ${props => props.border ? '1px solid var(--cBorder)' : 'none'};
  background-color: ${props => props.background};
  border-radius: 4px;
  color: ${props => props.color};
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  user-select: none;
  width: 100%;
  max-width: 400px;
  height: 32px;
  
  ${props => props.disabled && `
    opacity: .4;
    pointer-events: none;
  `}

  &:active {
    opacity: .7;
  }

  &:focus {
    outline: 0;
  }
  
  &:hover {
    background-color: ${props => props.backgroundHover};
  }
`;

export const MiniFormButtonWrapper = styled.div`
  margin: ${props => props.margin || '0 auto'};
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: fit-content;
  align-content: stretch;
`;

export const MiniFormButton = styled(FormButton)`
  height: 24px;
`;

export const FormButtonContentWrapper = styled.span`
  position: relative;
  top: -2px;
`;

export const SeparatorWrapper = styled.div`
  margin: 10px auto 10px;
  flex-direction: row;
  display: flex;
  max-width: 750px;
`;

export const SeparatorLine = styled.div`
  background-color: var(--cBorder);
  height: 1px;
  position: relative;
  top: .45em;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const SeparatorText = styled.div`
  color: var(--cGreyPrimary);
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
  text-transform: uppercase;
`;

const IconSpan = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 3px;
`;

export const FacebookIconSpan = styled(IconSpan)`
  background: url(${FacebookIcon});
`;

export const GoogleIconSpan = styled(IconSpan)`
  background: url(${GoogleIcon});
`;

export const ErrorSpan = styled.span`
  height: 22px;
  width: 22px;
  display: block;
  position: relative;
  
  > * svg {
    fill: var(--cError);
  }
`;

export const InputLabel = styled.span`
  font-weight: 500;
  padding-top: 10px;
  display: inline-block;
  font-size: 1.2em;
  vertical-align: top;
`;

export const InputPlaceholder = styled.span`
  font-weight: 500;
  padding-top: 10px;
  margin-left: 40px;
  position: absolute;
  white-space: nowrap;
`;

export const ToggleInputIcon = styled.span`
  height: 20px;
  position: absolute;
  margin-left: ${props => props.left || 10}px;
  color: var(--cFont);
  opacity: .8;
  
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  
  & svg {
    top: 0;
    height: 20px;
    padding-top: 10px;
    position: absolute;
  }
`;

export const RemoveFileButton = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 5;
  color: var(--cFont);
  opacity: .8;
  
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const PhotoPreviewBlock = styled.div`
  position: absolute;
  bottom: -${props => props.size / 3}px;
  right: -${props => props.size / 2}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 100%;
  border: 1px solid var(--cBorder);
  overflow: hidden;
`;

export const PhotoPreview = styled.img`
  height: 100%;
  width: 100%;
  background-color: var(--cThemeFront)
`;
