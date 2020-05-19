import styled from 'styled-components';

export const AuthContent = styled.div`
  color: #262626;
  justify-content: center;
  margin-top: 12px;
  max-width: 350px;
  width: 100%;
}
`;

export const InputsBlock = styled.div`
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 1px;
  margin: 0 0 10px;
  padding: 10px 0;
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
  
  &:active, &:focus {
    outline: 0;
  }
`;

export const InputSider = styled.div`
  align-items: center;
  height: 100%;
  padding-right: 8px;
  vertical-align: middle;
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
