import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from '../styles.scss'

import container from './container'

const TipNotLoggedIn = ({
  // required props
  openLoginModal,
  triggerSignUpModal,
  // container props
  // optional props
}) => {
  const t = useTranslation()

  return (
    <>
      {
        t(
          'competitive.tournament.tips.notLoggedIn',
          {
            login: (
              <Button
                priority={BUTTON_PRIORITY.LINK}
                onClick={openLoginModal}
                className={styles.link}
              >
                {t('competitive.tournament.info.login')}
              </Button>
            ),
            register: (
              <Button
                priority={BUTTON_PRIORITY.LINK}
                onClick={triggerSignUpModal}
                className={styles.link}
              >
                {t('competitive.tournament.info.register')}
              </Button>
            ),
          },
        )
      }
    </>
  )
}

TipNotLoggedIn.propTypes = {
  // required props
  openLoginModal: PropTypes.func.isRequired,
  triggerSignUpModal: PropTypes.func.isRequired,
  // container props
  // optional props
}

TipNotLoggedIn.defaultProps = {
  // optional props
}

export default container(TipNotLoggedIn)
