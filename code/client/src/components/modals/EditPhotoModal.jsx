import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { HighlightOff } from '@material-ui/icons';

import {
  ModalBody, ModalButtonsBlock, ModalCloseButton, ModalNote, ModalOverlay, ModalPhotoCanvas,
  ModalPhotoControls, ModalPhotoSlider, ModalPhotoSliderWrapper, ModalPhotoWrapper, PhotoSizeValue,
} from 'clientSrc/styles/blocks/modals';
import PrimaryButton from 'clientSrc/components/forms/common/PrimaryButton';
import LocaleText from 'clientSrc/components/common/LocaleText';
import * as ModalActions from 'clientSrc/actions/modalActions';
import { COMMON, FORM } from 'shared/constants/localeMessages';
import { MAX_IMAGE_SIZE } from 'shared/constants/common';
import EditorOverlay from '~/static/editor-overlay.png';

const IMG_SIZE = 150;
const CANVAS_SIZE = 250;

const EditPhotoModal = ({ data: { photoBase, photoObj, onClose } }) => {
  const [zoom, setZoom] = useState(99);
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const [draggingStart, setDraggingStart] = useState({ x: null, y: null });

  const editorOverlay = useMemo(() => {
    const overlay = new Image();
    overlay.onload = () => setZoom(100);
    overlay.src = EditorOverlay;
    return overlay;
  }, []);

  const size = useMemo(() => {
    const { width, height } = photoObj;
    const fixedSizeRatio = (width * height) / 22500;
    return ((photoBase.length * (3 / 4)) - 2) / fixedSizeRatio;
  }, [photoBase, photoObj]);

  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const canvasContext = useMemo(() => canvasRef.current?.getContext('2d'), [canvasRef.current]);

  useEffect(() => {
    // We postpone canvas drawing until canvas and overlay image are both properly loaded
    if (canvasContext && (editorOverlay.complete && editorOverlay.naturalWidth !== 0)) {
      canvasContext.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      const zoomMultiple = zoom >= 100
        ? (zoom - 85) / 15
        : 1 / ((130 - zoom) / 30);

      const windowSize = CANVAS_SIZE * zoomMultiple;
      const sx = ((photoObj.width / 2) - (windowSize / 2)) + offsets.x;
      const sy = ((photoObj.height / 2) - (windowSize / 2)) + offsets.y;

      canvasContext.drawImage(photoObj, sx, sy, windowSize, windowSize, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      canvasContext.drawImage(editorOverlay, 0, 0);
      canvasContext.beginPath();
      canvasContext.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, IMG_SIZE / 2, 0, 2 * Math.PI);
      canvasContext.lineWidth = 3;
      canvasContext.strokeStyle = '#FAFAFA';
      canvasContext.setLineDash([5, 5]);
      canvasContext.stroke();
    }
  }, [canvasRef.current, editorOverlay, offsets, zoom]);

  const closeModal = useCallback(() => dispatch(ModalActions.closeModal()), [dispatch]);

  const savePhoto = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = IMG_SIZE;
    canvas.height = IMG_SIZE;
    const context = canvas.getContext('2d');

    const zoomMultiple = zoom >= 100
      ? (zoom - 85) / 15
      : 1 / ((130 - zoom) / 30);

    const windowSize = IMG_SIZE * zoomMultiple;
    const sx = ((photoObj.width / 2) - (windowSize / 2)) + offsets.x;
    const sy = ((photoObj.height / 2) - (windowSize / 2)) + offsets.y;

    context.drawImage(photoObj, sx, sy, windowSize, windowSize, 0, 0, IMG_SIZE, IMG_SIZE);

    onClose(canvas.toDataURL(), size);
    closeModal();
  }, [photoObj, offsets, zoom, closeModal, size]);

  const handleWheelZooming = useCallback(e => {
    e.stopPropagation();
    const newZoom = zoom + (e.deltaY / 100);
    if (newZoom >= 1 && newZoom <= 200) {
      setZoom(newZoom);
    }
  }, [zoom, setZoom]);

  const handleOffsetMoving = useCallback(e => {
    const { x, y } = draggingStart;
    if (x !== null && y !== null) {
      setDraggingStart({ x: e.pageX, y: e.pageY });

      const zoomMultiple = zoom >= 100
        ? (zoom - 85) / 15
        : 1 / ((130 - zoom) / 30);

      const newOffsetX = offsets.x + ((x - e.pageX) * zoomMultiple);
      const newOffsetY = offsets.y + ((y - e.pageY) * zoomMultiple);

      if ((photoObj.width / 2) - Math.abs(newOffsetX) > 0 && (photoObj.height / 2) - Math.abs(newOffsetY) > 0) {
        setOffsets({ x: newOffsetX, y: newOffsetY });
      }
    }
  }, [draggingStart, photoObj, offsets]);

  return (
    <ModalOverlay
      onWheel={handleWheelZooming}
      onMouseUp={() => setDraggingStart({ x: null, y: null })}
      onMouseMove={handleOffsetMoving}
    >
      <ModalBody>
        <ModalCloseButton onClick={closeModal}><HighlightOff /></ModalCloseButton>
        <ModalPhotoControls>
          <ModalPhotoWrapper>
            <ModalPhotoCanvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              onMouseDown={e => setDraggingStart({ x: e.pageX, y: e.pageY })}
            />
          </ModalPhotoWrapper>
          <ModalPhotoSliderWrapper>
            <ModalPhotoSlider
              type="range"
              value={zoom}
              min={1}
              max={200}
              onChange={e => setZoom(Number(e.target.value))}
            />
          </ModalPhotoSliderWrapper>
        </ModalPhotoControls>
        <ModalNote>
          <LocaleText
            message={COMMON.PHOTO_SIZE}
            modifierFunc={text => (
              <>
                {text}:&nbsp;
                <PhotoSizeValue isOk={size <= MAX_IMAGE_SIZE}>~{(size / 1000).toFixed(2)} KB</PhotoSizeValue>&nbsp;
                {size > MAX_IMAGE_SIZE && ' (max 2MB)'}
              </>
            )}
          />
        </ModalNote>
        <ModalButtonsBlock>
          <PrimaryButton
            clickHandler={savePhoto}
            background="var(--cBluePrimary)"
            backgroundHover="var(--cBlueSecondary)"
            color="var(--cFont)"
            disabled={size > MAX_IMAGE_SIZE}
          >
            <LocaleText message={FORM.SAVE} />
          </PrimaryButton>
        </ModalButtonsBlock>
      </ModalBody>
    </ModalOverlay>
  );
};

EditPhotoModal.propTypes = {
  data: PropTypes.shape({
    photoBase: PropTypes.string.isRequired,
    photoObj: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditPhotoModal;
