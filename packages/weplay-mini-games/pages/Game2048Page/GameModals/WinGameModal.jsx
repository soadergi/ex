import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import ModalFooter from './ModalFooter'
import styles from './styles.scss'

const WinGameModal = ({
  isLoggedIn,
  openLoginModal,
  continueGame,
}) => {
  const t = useTranslation()

  const modalText = t(`mediaCore.game2048.popup.win.${isLoggedIn ? 'registeredText' : 'unregisteredText'}`)
  const continueButtonText = t(`mediaCore.game2048.popup.button.${isLoggedIn ? 'continue' : 'continueForFun'}`)

  return (
    <>
      <div className={styles.contentFlex}>
        <p className={styles.title}>
          {t('mediaCore.game2048.popup.win.title')}
        </p>
        <span className={styles.text}>
          {modalText}
        </span>
        <div className={styles.buttonWrapper}>
          <Button
            color={BUTTON_COLOR.CTA}
            onClick={continueGame}
            className={classNames(
              styles.button,
              styles.leftButton,
            )}
          >
            {continueButtonText}
          </Button>
          {!isLoggedIn && (
            <div className={styles.rightButton}>
              <Button
                color={BUTTON_COLOR.CTA}
                priority={BUTTON_PRIORITY.SECONDARY}
                onClick={openLoginModal}
                className={styles.button}
              >
                {t('mediaCore.game2048.popup.button.join')}
              </Button>
            </div>
          )}
        </div>
      </div>

      <ModalFooter />
    </>
  )
}

WinGameModal.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  continueGame: PropTypes.func.isRequired,
}

export default WinGameModal
