import styled, { css } from 'styled-components';

import FacebookIcon from '~/static/social/facebook-icon-white.png';
import GoogleIcon from '~/static/social/google-icon.svg';

export const InputRow = styled.div`
  margin: 0 ${props => props.fixedPadding ? '42px' : 'auto'} 6px;
  position: relative;
  min-height: 38px;
  max-width: 650px;
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

export const SwitchInputWrapper = styled.div`
  position: relative;
  background-color: var(--cThemeFront);
  border: 1px solid var(--cBorder);
  border-radius: 1px;  
  box-sizing: border-box;
  display: inline-block;
  float: right;
`;

export const TextInputBox = styled.label`
  height: 36px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
  width: max-content;
`;

export const FileInputBox = styled.label`
  height: 150px;
  width: 100%;
  position; relative;
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

export const SwitchInputBox = styled.label`
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

export const TextInputLabel = styled.span`
  color: var(--cGreyPrimary);
  font-size: 12px;
  height: 36px;
  left: 8px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform-origin: left;
  right: 0;
  user-select: none;
  transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  
  ${props => props.shrunken && {
    WebkitTransform: 'scale(.83333) translateY(-10px)',
    transform: 'scale(.83333) translateY(-10px)',
  }}
`;

export const FileInputLabel = styled.span`
  position: absolute;
  width: 100%;
  font-weight: 600px;
  user-select: none;
  display: grid;
  margin: auto;
  text-align: center;
  padding-top: 35px;
  
  & svg {
    margin: auto;
    font-size: 50px;
    color: var(--cBluePrimary);
  }
`;

export const SwitchInputLabel = styled.span`
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

export const TextInputField = styled.input`
  background: var(--cThemeBack);
  color: var(--cFont);
  overflow: hidden;
  padding: ${props => props.shrunken ? '14px 0 2px 8px' : '9px 0 7px 8px'};
  text-overflow: ellipsis;
  margin: 0;
  border: 0;
  width: 100%;
  
  &:active, &:focus {
    outline: 0;
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

export const TextInputSider = styled.div`
  align-items: center;
  height: 100%;
  padding-right: 8px;
  vertical-align: middle;
  display: flex;
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

  &:active {
    opacity: .7;
  }

  &:focus {
    outline: 0;
  }
  
  &:hover {
    background-color: ${props => props.backgroundHover};
  }

  ${props => props.disabled
    ? css`opacity: .4; pointer-events: none;`
    : ''
};
`;

export const FormButtonContentWrapper = styled.span`
  position: relative;
  top: -2px;
`;

export const SeparatorWrapper = styled.div`
  margin: 10px auto 18px;
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
  stroke: var(--cError);
  height: 22px;
  width: 22px;
  padding-left: 8px;
  display: block;
  position: relative;
`;

export const InputLabel = styled.span`
  font-weight: 500;
  padding-top: 10px;
  display: inline-block;
  font-size: 1.1em;
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
  z-index: 100;
  color: var(--cFont);
  opacity: .8;
  
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const PhotoPreviewBlock = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 25px;
  top: 0;
  display: inline-block;
  border-radius: 100%;
  border: 1px solid var(--cBorder);
  overflow: hidden;
`;

export const PhotoPreview = styled.img`
  height: 100%;
  width: 100%;
`;
