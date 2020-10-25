import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Publish, HighlightOff } from '@material-ui/icons';

import { isInputValid } from 'shared/helpers/validation';
import { ERROR, FORM } from 'shared/constants/localeMessages';
import {
  InputRow,
  InputWrapper,
  FileInputBox,
  FileInputLabel,
  FileImagePreview,
  FileInputField,
  FileInputPreview,
  RemoveFileButton,
  PhotoPreviewBlock,
  PhotoPreview,
  PhotoInputWrapper,
} from 'clientSrc/styles/blocks/form';

import * as NotificationTypes from 'shared/constants/notificationTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import LocaleText from '../../common/LocaleText';

const PhotoInputComponent = ({
  name, message, size, closable, reference, updateInput, onFileRemove, addNotification
}) => {
  const [file, setFile] = useState(null)
  const [inputActive, setInputActive] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = useCallback(({ target: { files } }) => {
    if (!files[0]) {
      return;
    }
    const { valid, message } = isInputValid(InputTypes.PHOTO, files);
    if (!valid) {
      addNotification(NotificationTypes.WARNINGS, message || ERROR.IMAGE_INVALID);
      return;
    }
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      setFile(result);
      updateInput(valid, result);
    };
    reader.readAsDataURL(files[0]);
  }, []);

  const handleFileRemove = e => {
    setFile(null);
    updateInput(true, '');
    onFileRemove && onFileRemove(e);
  }

  useEffect(() => reference && reference.current && reference.current.click(), [reference]);

  return (
    <InputRow>
      <PhotoInputWrapper active={inputActive} size={size}>
        {(file || closable) && (
          <RemoveFileButton onClick={handleFileRemove}>
            <HighlightOff />
          </RemoveFileButton>
        )}
        <FileInputBox htmlFor={name}>
          {file && !dragActive
            ? (
              <FileInputPreview>
                <FileImagePreview src={file} />
              </FileInputPreview>
            )
            : (
              <FileInputLabel>
                <Publish />
                <LocaleText message={dragActive ? FORM.DROP_PHOTO_HERE : FORM.CLICK_TO_UPLOAD} />
              </FileInputLabel>
            )}
          <FileInputField
            name={name}
            type="file"
            ref={reference}
            onChange={handleInputChange}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            onDrop={() => setDragActive(false)}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            noValidate
          />
        </FileInputBox>
        {message && (
          <PhotoPreviewBlock size={size / 3}>
            <PhotoPreview src={message} />
          </PhotoPreviewBlock>
        )}
      </PhotoInputWrapper>
    </InputRow>
  );
}

PhotoInputComponent.defaultProps = {
  closable: false,
  size: 150,
}

PhotoInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  closable: PropTypes.bool,
  size: PropTypes.number,
  updateInput: PropTypes.func,
  onFileRemove: PropTypes.func,
  addNotification: PropTypes.func.isRequired,
  reference: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(PhotoInputComponent);
