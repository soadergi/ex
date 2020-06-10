import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import Prize from '../PrizeSection/Prize/Prize'

import ModalFooter from './ModalFooter'
import styles from './styles.scss'

const NewGameModal = ({
  isLoggedIn,
  openLoginModal,
  startGame,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  const modalText = t(`mediaCore.game2048.popup.start.${isLoggedIn ? 'registeredText' : 'unregisteredText'}`)

  return (
    <>
      <div className={styles.contentFlex}>
        {!isMobileWidth && (
        <Prize className={styles.welcomePrize} />
        )}
        <p className={styles.title}>
          {t('mediaCore.game2048.popup.start.title')}
        </p>
        <span className={styles.muteText}>
          {t('mediaCore.game2048.popup.start.heroUnlock')}
        </span>
        <div className={styles.wrap}>
          <span className={styles.text}>
            {modalText}
          </span>
          <div className={styles.buttonWrapper}>
            {!isLoggedIn && (
              <Button
                color={BUTTON_COLOR.CTA}
                onClick={openLoginModal}
                className={classNames(
                  styles.button,
                  styles.leftButton,
                )}
              >
                {t('mediaCore.game2048.popup.button.join')}
              </Button>
            )}
            <Button
              priority={BUTTON_PRIORITY.SECONDARY}
              color={BUTTON_COLOR.WHITE}
              onClick={startGame}
              className={styles.button}
            >
              {t(`mediaCore.game2048.popup.button.${isLoggedIn ? 'play' : 'playForFun'}`)}
            </Button>
          </div>
        </div>
      </div>

      <ModalFooter />
    </>
  )
}

NewGameModal.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
}

export default NewGameModal
