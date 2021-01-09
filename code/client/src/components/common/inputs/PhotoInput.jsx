import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Publish, HighlightOff } from '@material-ui/icons'

import {
  InputRow, FileInputBox, FileInputLabel, FileImagePreview, FileInputField,
  FileInputPreview, RemoveFileButton, PhotoPreviewBlock, PhotoPreview, PhotoInputWrapper,
} from 'clientSrc/styles/blocks/form'
import { MODAL_TYPE } from 'clientSrc/constants'
import { ModalActions, NotificationActions } from 'clientSrc/actions'
import { INPUT_TYPE, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR, FORM } from 'shared/constants/localeMessages'
import { isInputValid } from 'shared/helpers/validation'

import LocaleText from '../LocaleText'

const PhotoInput = ({
  name, message, size, closable, reference, onUpdate, onFileRemove,
}) => {
  const [file, setFile] = useState(null)
  const [inputActive, setInputActive] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const dispatch = useDispatch()

  const addNotification = useCallback((type, msg) => dispatch(
    NotificationActions.addNotifications({ [type]: [msg] })
  ), [dispatch])

  const openPhotoEditor = useCallback((photoBase, photoObj, onClose) => dispatch(
    ModalActions.openModal({ type: MODAL_TYPE.PHOTO_EDITOR, data: { photoBase, photoObj, onClose } })
  ), [dispatch])

  const handleInputChange = useCallback(event => {
    const { target: { files, ...rest } } = event
    console.log('HANDLING INPUT CHANGE', files, rest)
    if (!files[0]) {
      event.target.value = ''
      return
    }
    const { valid: inputValid, message: inputMessage } = isInputValid(INPUT_TYPE.PHOTO, files[0], -1)
    if (!inputValid) {
      addNotification(NOTIFICATION_TYPE.WARNINGS, inputMessage || ERROR.IMAGE_INVALID)
      event.target.value = ''
      return
    }
    const { type, name: photoName } = files[0]
    const reader = new FileReader()
    reader.onload = ({ target: { result } }) => {
      if (type === 'image/gif') {
        setFile(result)
        onUpdate(name, inputValid, {
          type,
          size: result.length,
          name: photoName,
          data: result,
        })
      } else {
        const img = new Image()
        img.onload = () => {
          openPhotoEditor(result, img, (editedPhoto, newSize) => {
            setFile(editedPhoto)
            onUpdate(name, inputValid, {
              type,
              size: newSize,
              name,
              data: editedPhoto,
            })
          })
        }
        img.src = result
      }
    }
    reader.readAsDataURL(files[0])
    event.target.value = ''
  }, [name, onUpdate])

  const handleFileRemove = useCallback(e => {
    setFile(null)
    onUpdate(name, true, '')

    if (onFileRemove) {
      onFileRemove(e)
    }
  }, [name, onUpdate, onFileRemove])

  useEffect(() => reference && reference.current && reference.current.click(), [reference])
  // todo: Images dropped from other tabs get opened in new tab instead of getting uploaded
  return (
    <InputRow>
      <PhotoInputWrapper active={inputActive} size={size} hasPreview={file}>
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
            onChange={e => handleInputChange(e)}
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
  )
}

PhotoInput.defaultProps = {
  closable: false,
  size: 150,
}

PhotoInput.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  closable: PropTypes.bool,
  size: PropTypes.number,
  onUpdate: PropTypes.func,
  onFileRemove: PropTypes.func,
  reference: PropTypes.object,
}

export default PhotoInput
