import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const PopupContent = ({
  // required props
  renderContent,
  closePopup,

  // container props
  popupPosition,
  savePopupContentRef,

  // optional props
}) => (
  <div
    className={styles.block}
    ref={savePopupContentRef}
    style={popupPosition}
  >
    {renderContent({
      onClose: closePopup,
    })}
  </div>
)

PopupContent.propTypes = {
  // required props
  renderContent: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,

  // container props
  globalScope: PropTypes.shape({}).isRequired,
  savePopupContentRef: PropTypes.func.isRequired,
  popupPosition: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,

  // optional props
}

PopupContent.defaultProps = {
  // optional props
}

export default container(PopupContent)
