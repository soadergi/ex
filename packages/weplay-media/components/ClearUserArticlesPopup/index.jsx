import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import ModalBase from 'weplay-components/ModalBase'
import Header from 'weplay-components/_modal-components/Header'

import container from './container'
import styles from './styles.scss'

const ClearUserArticlesPopup = ({
  isShown,
  handleClosePopup,
  currentStep,
  handleDeleteBookmarks,
  popupName,
}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={handleClosePopup}
      isShown={isShown}
    >
      <div data-gtm={`ClearHistory ${currentStep}`}>
        <Header
          title={t(`mediaCore.myMedia.modals.${popupName}.${currentStep}.title`)}
        />
        <div>
          <p className={styles.text}>
            {t(`mediaCore.myMedia.modals.${popupName}.${currentStep}.subTitle`)}
          </p>
          <div className={styles.controls}>
            <Button
              type="submit"
              onClick={handleDeleteBookmarks}
              color={BUTTON_COLOR.DANGER}
              priority={BUTTON_PRIORITY.SECONDARY}
            >
              {t(`mediaCore.myMedia.modals.${currentStep}.button`)}

            </Button>
            <Button
              type="button"
              onClick={handleClosePopup}
            >
              {t(`mediaCore.myMedia.modals.${currentStep}.link`)}
            </Button>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}

ClearUserArticlesPopup.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  handleClosePopup: PropTypes.func.isRequired,
  currentStep: PropTypes.string.isRequired,
  handleDeleteBookmarks: PropTypes.func.isRequired,
  popupName: PropTypes.string.isRequired,
  // optional props
}

export default container(ClearUserArticlesPopup)
