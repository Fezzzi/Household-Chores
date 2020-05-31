import styled, { css } from 'styled-components';

import FacebookIcon from '~/static/social/facebook-icon-white.png';
import GoogleIcon from '~/static/social/google-icon.svg';
import LogoTop from '~/static/logo-top.svg';

export const AuthContent = styled.div`
  color: #262626;
  justify-content: flex-start;
  margin: 12px auto 0 auto;
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 44px;
}
`;

export const LogoBlock = styled.div`
  margin: 10px 0 0;
  padding: 10px 0 0;
  font-size: 72px;
  font-weight: 800;
  text-align: center;
  width: 100%;
  line-height: normal;
  font-family: Carter One;
`;

export const LogoTopBlock = styled.div`
  height: 80px;
  width: 100%;
  position: relative;
  top: 3px;
  background: url(${LogoTop});
`;

export const InputsBlock = styled.div`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 1px;
  margin: 10px 0;
  padding: ${props => props.extraPadding ? 25 : 10}px 0;
`;

export const InputRow = styled.div`
  margin: 0 40px 6px;
`;

export const InputWrapper = styled.div`
  background: #fafafa;
  align-items: center;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  box-sizing: border-box;
  color: #262626;
  font-size: 14px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const InputBox = styled.label`
  height: 36px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
`;

export const InputLabel = styled.span`
  color: #8e8e8e;
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
`;

export const InputField = styled.input`
  background: #fafafa;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  margin: 0;
  border: 0;
  flex: 1 0 auto;
  
  &:active, &:focus {
    outline: 0;
  }
`;

export const InputSider = styled.div`
  align-items: center;
  height: 100%;
  padding-right: 8px;
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
  color: #262626;
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
  margin: 14px 40px;
  align-content: stretch;
`;

export const FormButton = styled.button`
  border: ${props => props.border ? '1px solid #dbdbdb' : 'none'};
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
  height: 32px;

  &:active {
    opacity: .7;
  }

  &:focus {
    outline: 0;
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
  margin: 10px 40px 18px;
  flex-direction: row;
  display: flex;
`;

export const SeparatorLine = styled.div`
  background-color: #dbdbdb;
  height: 1px;
  position: relative;
  top: .45em;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const SeparatorText = styled.div`
  color: #8e8e8e;
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

export const FacebookTextSpan = styled.span`
  color: #385185;
`;

export const GoogleTextSpan = styled.span`
  color: #ea4335;
`;

export const LinkRow = styled.a`
  color: #00376b;
  font-size: 12px;
  line-height: 14px;
  margin-top: 12px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  display: block;

  &:active {
    opacity: .7;
  }
`;

export const BottomMessageWrapper = styled.div`
  display: block;
  color: #8e8e8e;
  font-weight: 300;
  font-size: 14px;
  line-height: 18px;
  margin: -3px 0 -4px;
`;

export const BottomMessageBlock = styled.p`
  color: #262626;
  font-size: 14px;
  margin: 15px;
  text-align: center;
`;

export const BottomMessageLink = styled.a`
  color: #0095f6;
  text-decoration: none;
  cursor: pointer;

  &:active {
    opacity: .7;
  }
`;

export const MessageBlock = styled.p`
  color: #8e8e8e;
  font-size: ${props => props.bigFont ? 14 : 12}px;
  margin: 10px 40px;
  line-height: ${props => props.bigFont ? 18 : 16}px;
  text-align: center;
`;

export const MessageBlockLink = styled.a`
  color: #8e8e8e;
  font-weight: 600;
  text-decoration: none;
`;

export const ErrorSpan = styled.span`
  stroke: var(--cError);
  height: 22px;
  width: 22px;
  margin-left: 8px;
  display: block;
`;
