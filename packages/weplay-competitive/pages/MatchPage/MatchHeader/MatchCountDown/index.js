import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import countdownPropType from 'weplay-core/customPropTypes/countdownPropType'

import container from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchCountDown/container'

import styles from './styles.scss'

const MatchCountDown = ({
  // required props

  // container props
  countdown: {
    hours,
    minutes,
    seconds,
    isPassed,
  },
  // optional props
}) => {
  const t = useTranslation()

  return (
    !isPassed && (
      <div
        className={styles.block}
      >
        <p className={styles.title}>
          {t('competitive.match.countdown.title')}
        </p>
        <p className={styles.counter}>
          {`${hours}:${minutes}:${seconds}`}
        </p>
      </div>
    )
  )
}

MatchCountDown.propTypes = {
  // required props

  // container props
  countdown: countdownPropType.isRequired,
  // optional props
}

MatchCountDown.defaultProps = {
  // optional props
}

export default container(MatchCountDown)
