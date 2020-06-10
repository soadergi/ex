import React from 'react'
import PropTypes from 'prop-types'

import withOauth2Handler from 'weplay-core/HOCs/withOauth2Handler'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './ConnectTwitchAccountButton.scss'

function ConnectTwitchAccountButton({
  text,
  handleOpenAuthPopup,
}) {
  return (
    <Button
      onClick={handleOpenAuthPopup}
      className={styles.button}
      color={BUTTON_COLOR.TWITCH}
      icon="twitch"
    >
      {text}
    </Button>
  )
}

ConnectTwitchAccountButton.propTypes = {
  text: PropTypes.string,
  handleOpenAuthPopup: PropTypes.func.isRequired,
}

ConnectTwitchAccountButton.defaultProps = {
  text: '',
}

export default React.memo((withOauth2Handler(ConnectTwitchAccountButton)))
