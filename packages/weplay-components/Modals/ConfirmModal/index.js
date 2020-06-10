import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import ModalHeader from 'weplay-components/Modals/ModalHeader'

import styles from './styles.scss'

const ConfirmModal = ({
  // required props
  isShown,
  onCloseModal,
  onConfirm,

  title,
  subTitle,
  confirmBtnText,
  closeBtnText,
  // optional props
  modifiers,
}) => (
  <ModalBase
    isShown={isShown}
    handleClose={onCloseModal}
  >
    <ModalHeader
      className={styles.header}
      title={title}
      subtitle={subTitle}
    />
    <div className={classNames(
      'u-flex-sm',
      styles.block,
    )}
    >
      <Button
        className={styles.left}
        color={modifiers.confirmButton}
        onClick={onConfirm}
      >
        {confirmBtnText}
      </Button>
      <Button
        color={BUTTON_COLOR.BLACK}
        priority={BUTTON_PRIORITY.SECONDARY}
        className={styles.right}
        onClick={onCloseModal}
      >
        {closeBtnText}
      </Button>
    </div>
  </ModalBase>
)

ConfirmModal.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  modifiers: PropTypes.shape({
    confirmButton: PropTypes.arrayOf(PropTypes.string),
  }),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  confirmBtnText: PropTypes.string.isRequired,
  closeBtnText: PropTypes.string.isRequired,
}

ConfirmModal.defaultProps = {
  // optional props
  modifiers: {},
}

export default React.memo(ConfirmModal)
