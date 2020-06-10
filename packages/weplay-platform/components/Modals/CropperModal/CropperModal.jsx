import React from 'react'
import PropTypes from 'prop-types'
import ModalBase from 'weplay-components/ModalBase'
import Cropper from 'weplay-components/Cropper/loadable'

const CropperModal = ({
  isShown,
  closeHandler,
  ...cropperProps
}) => (
  <ModalBase
    handleClose={closeHandler}
    isShown={isShown}
  >
    {isShown && (
      <Cropper
        handleClose={closeHandler}
        {...cropperProps}
      />
    )}
  </ModalBase>
)

CropperModal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  isShown: PropTypes.bool,
}

CropperModal.defaultProps = {
  isShown: false,
}

export default React.memo(CropperModal)
