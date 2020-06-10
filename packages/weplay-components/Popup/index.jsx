import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import container from './container'
import PopupContent from './PopupContent'

const Popup = ({
  // required props
  renderTrigger,
  renderContent,

  // container props
  isPopupVisible,
  handlePopupToggle,
  saveTriggerRef,
  globalScope,
  handleClose,
  getTriggerRef,

  // optional props
  centered,
}) => (
  <Fragment>
    {renderTrigger({ saveTriggerRef, handlePopupToggle })}
    {isPopupVisible && ReactDOM.createPortal(
      <PopupContent
        centered={centered}
        renderContent={renderContent}
        closePopup={handleClose}
        getTriggerRef={getTriggerRef}
      />,
      globalScope.document.body,
    )}
  </Fragment>
)

Popup.propTypes = {
  // required props
  renderTrigger: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired,

  // container props
  isPopupVisible: PropTypes.bool.isRequired,
  handlePopupToggle: PropTypes.func.isRequired,
  saveTriggerRef: PropTypes.func.isRequired,
  getTriggerRef: PropTypes.func.isRequired,
  globalScope: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,

  // optional props
  centered: PropTypes.bool,
}

Popup.defaultProps = {
  // optional props
  centered: false,
}

export default container(Popup)
