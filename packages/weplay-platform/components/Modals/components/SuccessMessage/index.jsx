import React from 'react'
import PropTypes from 'prop-types'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import container from './container'
import styles from './styles.scss'

const SuccessMessage = ({
  handleClick,
  t,
  text,
}) => (
  <>
    <p className={styles.information}>{text}</p>
    <ModalControls
      primaryButtonType="button"
      primaryButtonText={t('mediaCore.registration.confirmPassButton')}
      primaryButtonCallback={handleClick}
    />
  </>
)

SuccessMessage.propTypes = {
  t: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

export default container(SuccessMessage)
