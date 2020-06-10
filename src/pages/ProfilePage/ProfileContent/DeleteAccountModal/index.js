import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SvgIcon from 'weplay-components/SvgIcon'
import Checkbox from 'weplay-components/Checkbox'
import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const bordered = ['bordered']

const DeleteAccountModal = ({
  // required props

  toggleDeleteAccountModal,
  toggleCheckbox,
  isChecked,
  // container props
  handleClick,
  // optional props
  isShown,
}) => {
  const t = useTranslation()

  return (
    <ModalBase
      handleClose={toggleDeleteAccountModal}
      isShown={isShown}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {t('cabinet.deleteAccountModal.title')}
        </p>
        <div className={styles.section}>
          <SvgIcon
            className={styles.icon}
            iconName="stop"
            type="color"
          />
          <span className={styles.text}>
            {t('cabinet.deleteAccountModal.text')}
          </span>
        </div>
        <Checkbox
          modifiers={bordered}
          onChange={toggleCheckbox}
          value={isChecked}
        >
          <span className={styles.checkboxText}>
            {t('cabinet.deleteAccountModal.checkboxText')}
          </span>
        </Checkbox>
        <div className={styles.buttonBlock}>
          <Button
            className={styles.button}
            onClick={toggleDeleteAccountModal}
          >
            {t('cabinet.deleteAccountModal.cancelButton')}
          </Button>
          <Button
            color={BUTTON_COLOR.DANGER}
            priority={BUTTON_PRIORITY.SECONDARY}
            disabled={!isChecked}
            onClick={handleClick}
          >
            {t('cabinet.deleteAccountModal.deleteButton')}
          </Button>
        </div>
      </div>
    </ModalBase>

  )
}

DeleteAccountModal.propTypes = {
  // required props
  handleClick: PropTypes.func.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  toggleDeleteAccountModal: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  // container props

  // optional props
}

DeleteAccountModal.defaultProps = {
  // optional props
}

export default container(DeleteAccountModal)
