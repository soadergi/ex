import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const ModalControls = ({
  // required props
  primaryButtonType,
  secondaryButtonType,
  // optional props
  primaryButtonText,
  secondaryButtonText,
  primaryButtonDisabled,
  secondaryButtonDisabled,
  primaryButtonCallback,
  secondaryButtonCallback,
  ...props
}) => (
  <div
    className={classNames(
      styles.controls,
      { [styles.grid]: secondaryButtonCallback },
    )}
    {...props}
  >
    {secondaryButtonCallback && (
    <Button
      type={secondaryButtonType}
      disabled={secondaryButtonDisabled}
      onClick={secondaryButtonCallback}
      className={styles.button}
      priority={BUTTON_PRIORITY.SECONDARY}
    >
      {secondaryButtonText}
    </Button>
    )}
    <Button
      type={primaryButtonType}
      disabled={primaryButtonDisabled}
      onClick={primaryButtonCallback}
      className={styles.button}
    >
      {primaryButtonText}
    </Button>
  </div>
)

ModalControls.propTypes = {
  // optional props
  primaryButtonType: PropTypes.string,
  secondaryButtonType: PropTypes.string,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  primaryButtonCallback: PropTypes.func,
  secondaryButtonCallback: PropTypes.func,
  primaryButtonDisabled: PropTypes.bool,
  secondaryButtonDisabled: PropTypes.bool,
}

ModalControls.defaultProps = {
  // optional props
  primaryButtonType: '',
  secondaryButtonType: '',
  primaryButtonText: '',
  secondaryButtonText: '',
  primaryButtonDisabled: false,
  secondaryButtonDisabled: false,
  primaryButtonCallback: null,
  secondaryButtonCallback: null,
}

export default ModalControls
