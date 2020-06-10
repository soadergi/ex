import React from 'react'
import PropTypes from 'prop-types'
import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'

import Digit from './Digit'
import container from './container'
import styles from './styles.scss'

const Countdown = ({
  i18n,
  countdown: {
    days,
    hours,
    minutes,
    seconds,
  },
}) => (
  <div className={styles.countdown}>
    <div className={styles.container}>
      <Digit
        value={days}
        text={i18n.voting.countdown.days}
      />
      <Digit
        value={hours}
        text={i18n.voting.countdown.hours}
      />
      <Digit
        value={minutes}
        text={i18n.voting.countdown.minutes}
      />
      <Digit
        value={seconds}
        text={i18n.voting.countdown.seconds}
      />
    </div>
  </div>
)


Countdown.propTypes = {
  i18n: PropTypes.shape({}).isRequired,
  countdown: countdownPropType.isRequired,
}

Countdown.defaultProps = {

}

export default container(Countdown)
