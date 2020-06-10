import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import MessageBanner from 'weplay-components/MessageBanner'

import messageImage2 from './img/blue-uranus.svg'
import styles from './styles.scss'
import container from './container'

const WelcomeBanner = ({
  // required props
  title,
  text,
  // container props
  openLoginModal,
  triggerSignUpModal,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <MessageBanner
        imageUrl={messageImage2}
        title={title}
      >
        <>
          <p className={styles.text}>
            {text}
          </p>
          <button
            type="button"
            className={styles.bannerButton}
            onClick={openLoginModal}
          >
            {t('mediaCore.modals.welcomeButton')}
          </button>
          <button
            type="button"
            className={styles.bannerButtonReg}
            onClick={triggerSignUpModal}
          >
            {t('mediaCore.modals.welcomeLink')}
          </button>
        </>
      </MessageBanner>
    </>
  )
}

WelcomeBanner.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  // container props
  openLoginModal: PropTypes.func.isRequired,
  triggerSignUpModal: PropTypes.func.isRequired,
  // optional props
}

WelcomeBanner.defaultProps = {
  // optional props
}

export default container(WelcomeBanner)
