import React from 'react'
import PropTypes from 'prop-types'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const AuthBlock = ({
  // required props
  signUpHandler,
  loginHandler,

  // container props
  i18nTexts,

  // optional props
}) => (
  <p className={styles.block}>
    <Button
      onClick={loginHandler}
      className={styles.button}
      priority={BUTTON_PRIORITY.LINK}
    >
      {i18nTexts.votingMVP.authBlock.loginBtn}
    </Button>

    {i18nTexts.votingMVP.authBlock.or}

    <Button
      onClick={signUpHandler}
      className={styles.button}
      priority={BUTTON_PRIORITY.LINK}
    >
      {i18nTexts.votingMVP.authBlock.registerBtn}
    </Button>

    {i18nTexts.votingMVP.authBlock.vote}
  </p>
)

AuthBlock.propTypes = {
  // required props
  loginHandler: PropTypes.func.isRequired,
  signUpHandler: PropTypes.func.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

AuthBlock.defaultProps = {
  // optional props
}

export default container(AuthBlock)
