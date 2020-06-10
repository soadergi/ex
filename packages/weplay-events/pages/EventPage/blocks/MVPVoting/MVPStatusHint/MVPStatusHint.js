import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import withCountDown from 'weplay-components/withCountDown'
import Icon from 'weplay-components/Icon'

import styles from './MVPStatusHint.scss'

const MVPStatusHint = ({
  textClassName,
  iconName,
  isTournamentEnded,
  isAbleToVote,
  countdown,
  closestVoteDateTime,
}) => {
  const t = useTranslation()
  const isLoggedIn = useSelector(isLoggedInSelector)
  const countdownText = useMemo(() => `${countdown.hours}:${countdown.minutes}:${countdown.seconds}`, [countdown])

  const isCountdownVisible = useMemo(
    () => (!isTournamentEnded && !isAbleToVote && closestVoteDateTime && !countdown.isPassed && isLoggedIn),
    [closestVoteDateTime, countdown.isPassed, isAbleToVote, isLoggedIn],
  )

  const tournamentStateHintText = useMemo(() => {
    if (isTournamentEnded) {
      return t('events.MVPVotingBanner.hint.finished')
    }
    if (!isLoggedIn) {
      return t('events.MVPVotingBanner.hint.notLogInText')
    }
    if (!isAbleToVote) {
      return t('events.MVPVotingBanner.hint.alreadyVote')
    }
    return t('events.MVPVotingBanner.hint.logInText')
  }, [t, isTournamentEnded, isLoggedIn, isAbleToVote])

  return (
    <p
      className={classNames(
        textClassName,
        { [styles.isLoggedIn]: isLoggedIn },
      )}
    >
      {iconName && !isAbleToVote && (
        <Icon
          className={styles.icon}
          iconName={iconName}
          size="small"
        />
      )}

      {tournamentStateHintText}

      {isCountdownVisible && countdownText}
    </p>
  )
}

MVPStatusHint.propTypes = {
  isTournamentEnded: PropTypes.bool.isRequired,
  isAbleToVote: PropTypes.bool.isRequired,
  closestVoteDateTime: PropTypes.instanceOf(Date),
  countdown: PropTypes.shape({
    days: PropTypes.string,
    hours: PropTypes.string,
    minutes: PropTypes.string,
    seconds: PropTypes.string,
    isPassed: PropTypes.bool,
  }).isRequired,
  textClassName: PropTypes.string,
  iconName: PropTypes.string,
}

MVPStatusHint.defaultProps = {
  closestVoteDateTime: null,
  textClassName: '',
  iconName: '',
}

export default React.memo(withCountDown({ countdownTimePath: ['closestVoteDateTime'] })(MVPStatusHint))
