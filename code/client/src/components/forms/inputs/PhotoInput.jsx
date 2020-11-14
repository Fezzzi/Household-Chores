import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Publish, HighlightOff } from '@material-ui/icons';

import {
  InputRow, FileInputBox, FileInputLabel, FileImagePreview, FileInputField,
  FileInputPreview, RemoveFileButton, PhotoPreviewBlock, PhotoPreview, PhotoInputWrapper,
} from 'clientSrc/styles/blocks/form';
import { MODAL_TYPE } from 'clientSrc/constants/modalType';
import * as ModalActions from 'clientSrc/actions/modalActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import { ERROR, FORM } from 'shared/constants/localeMessages';
import { isInputValid } from 'shared/helpers/validation';

import LocaleText from '../../common/LocaleText';

const PhotoInput = ({
  name, message, size, closable, reference, updateInput, onFileRemove,
}) => {
  const [file, setFile] = useState(null);
  const [inputActive, setInputActive] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useDispatch();

  const addNotification = useCallback((type, message) => dispatch(
    NotificationActions.addNotifications({ [type]: [message] })
  ), [dispatch]);

  const openPhotoEditor = useCallback((photoBase, photoObj, onClose) => dispatch(
    ModalActions.openModal({ type: MODAL_TYPE.PHOTO_EDITOR, data: { photoBase, photoObj, onClose } })
  ), [dispatch]);

  const handleInputChange = useCallback(event => {
    const { target: { files } } = event;
    if (!files[0]) {
      event.target.value = '';
      return;
    }
    const { valid: inputValid, message: inputMessage } = isInputValid(InputTypes.PHOTO, files[0], -1);
    if (!inputValid) {
      addNotification(NotificationTypes.WARNINGS, inputMessage || ERROR.IMAGE_INVALID);
      event.target.value = '';
      return;
    }
    const { type, name } = files[0];
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      const img = new Image();
      img.onload = () => {
        if (type === 'image/gif') {
          setFile(result);
          updateInput(inputValid, {
            type,
            size: result.length,
            name,
            data: result,
          });
        } else {
          openPhotoEditor(result, img, (editedPhoto, newSize) => {
            setFile(editedPhoto);
            updateInput(inputValid, {
              type,
              size: newSize,
              name,
              data: editedPhoto,
            });
          });
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(files[0]);
    event.target.value = '';
  }, []);

  const handleFileRemove = e => {
    setFile(null);
    updateInput(true, '');

    if (onFileRemove) {
      onFileRemove(e);
    }
  };

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
};

PhotoInput.defaultProps = {
  closable: false,
  size: 150,
};

PhotoInput.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  closable: PropTypes.bool,
  size: PropTypes.number,
  updateInput: PropTypes.func,
  onFileRemove: PropTypes.func,
  reference: PropTypes.object,
};

export default PhotoInput;
