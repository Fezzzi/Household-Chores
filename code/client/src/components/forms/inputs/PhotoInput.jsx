import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Publish, HighlightOff } from '@material-ui/icons';

import { isInputValid } from 'shared/helpers/validation';
import { ERROR, FORM } from 'shared/constants/localeMessages';
import {
  InputRow, InputWrapper, FileInputBox, FileInputLabel, FileImagePreview,
  FileInputField, FileInputPreview, RemoveFileButton, PhotoPreviewBlock, PhotoPreview,
} from 'clientSrc/styles/blocks/form';

import * as NotificationTypes from 'shared/constants/notificationTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import LocaleText from '../../common/LocaleText';

class PhotoInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      inputActive: false,
      dragActive: false,
    };
  }

  handleInputChange = ({ target: { files } }) => {
    if (!files[0]) {
      return;
    }
    const { updateInput, addNotification } = this.props;
    const valid = isInputValid(InputTypes.PHOTO, files);
    if (!valid) {
      addNotification(NotificationTypes.WARNINGS, ERROR.IMAGE_INVALID);
      return;
    }
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      this.setState({
        file: result,
      });

      updateInput(valid, result);
    };
    reader.readAsDataURL(files[0]);
  };

  removeFileHandler() {
    const { updateInput } = this.props;

    this.setState({ file: null });
    updateInput(true, '');
  }

  render() {
    const { name, placeholder, message, hasError } = this.props;
    const { file, inputActive, dragActive } = this.state;

    return (
      <InputRow>
        <InputWrapper active={inputActive}>
          {file && (
            <RemoveFileButton onClick={this.removeFileHandler.bind(this)}>
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
                  <LocaleText message={dragActive ? FORM.DROP_PHOTO_HERE : message} />
                </FileInputLabel>
              )}
            <FileInputField
              name={name}
              type="file"
              onChange={this.handleInputChange}
              onFocus={() => this.setState({ inputActive: true })}
              onBlur={() => this.setState({ inputActive: false })}
              onDrop={() => this.setState({ dragActive: false })}
              onDragEnter={() => this.setState({ dragActive: true })}
              onDragLeave={() => this.setState({ dragActive: false })}
              noValidate
            />
          </FileInputBox>
        </InputWrapper>
        <PhotoPreviewBlock>
          {(file || placeholder) && <PhotoPreview src={file ?? placeholder} />}
        </PhotoPreviewBlock>
      </InputRow>
    );
  }
}

PhotoInputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(PhotoInputComponent);
