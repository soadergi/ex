import React from 'react'
import PropTypes from 'prop-types'

import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'

import styles from './styles.scss'

const MMModifier = ['MMModal', 'md']

const MMConfirm = ({
  // required props
  isShown,
  children,
  onCloseModal,
  onConfirm,
  confirmBtnText,
  closeBtnText,
  // optional props
}) => (
  <ModalBase
    isShown={isShown}
    handleClose={onCloseModal}
    modifiers={MMModifier}
  >
    <div className={styles.content}>
      {children}
      <div className={styles.footer}>
        <Button
          className={styles.main}
          color={BUTTON_COLOR.DANGER}
          size={BUTTON_SIZE.LG}
          onClick={onConfirm}
        >
          {confirmBtnText}
        </Button>
        <Button
          className={styles.extra}
          color={BUTTON_COLOR.WHITE}
          size={BUTTON_SIZE.LG}
          priority={BUTTON_PRIORITY.GHOST_WHITE}
          onClick={onCloseModal}
        >
          {closeBtnText}
        </Button>
      </div>
    </div>
  </ModalBase>
)

MMConfirm.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmBtnText: PropTypes.string.isRequired,
  closeBtnText: PropTypes.string.isRequired,
  // optional props
}

MMConfirm.defaultProps = {
  // optional props
}

export default MMConfirm
