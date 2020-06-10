import {
  compose,
  withHandlers,
} from 'recompose'
import Cropper from 'cropperjs'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { OUTPUT_IMAGE_SIZE } from './consts'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
  withHandlers((initialProps) => {
    let cropper
    return {
      setCropperImageRef: () => (elem) => {
        if (elem) {
          cropper = new Cropper(
            elem,
            {
              aspectRatio: 1 / 1,
              viewMode: 3,
              dragMode: 'move',
              modal: true,
              guides: false,
              center: false,
              highlight: false,
              background: false,
              cropBoxMovable: false,
              cropBoxResizable: false,
              toggleDragModeOnDblclick: false,
              zoomOnTouch: false,
              zoomOnWheel: false,
              ready() {
                this.cropper.zoomTo(0)
              },
            },
          )
        }
      },

      handleZoom: () => (e) => {
        const containerData = cropper.getContainerData()
        cropper.zoomTo(e.currentTarget.value, {
          x: containerData.width / 2,
          y: containerData.height / 2,
        })
      },

      cropImage: () => () => {
        cropper.getCroppedCanvas(OUTPUT_IMAGE_SIZE).toBlob((blob) => {
          initialProps.onCrop(blob)
          cropper.destroy()
          initialProps.handleClose()
        })
      },

      removePhoto: () => () => {
        initialProps.onCrop(false)
        cropper.destroy()
        initialProps.handleClose()
      },
    }
  }),
)

export default container
