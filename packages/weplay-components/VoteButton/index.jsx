import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LegacyButton from 'weplay-components/LegacyButton'
import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'

import container from './container'
import styles from './styles.scss'

const buttonModificationBorder = ['blockBorderBlue']

const VoteButton = ({
  handleButtonClick,
  className,
  countdown,
  returnButtonText,
}) => (
  <LegacyButton
    disabled={!countdown.isPassed}
    text={returnButtonText}
    modifiers={buttonModificationBorder}
    className={classNames(
      className,
    )}
    onClick={handleButtonClick}
  >
    {!countdown.isPassed && (
    <span className={styles.countdown}>
      <span className={styles.countdownItem}>{countdown.hours}</span>
      <span className={styles.countdownItem}>{countdown.minutes}</span>
      <span className={styles.countdownItem}>{countdown.seconds}</span>
    </span>
    )}
  </LegacyButton>
)

VoteButton.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  returnButtonText: PropTypes.string.isRequired,
  className: PropTypes.string,
  countdown: countdownPropType.isRequired,
}

VoteButton.defaultProps = {
  className: '',
}

export default container(VoteButton)
