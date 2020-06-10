import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import UserAvatar from 'weplay-components/UserAvatar'

import MatchSubtitleInfo from 'weplay-events/pages/EventPage/components/MatchSubtitleInfo/MatchSubtitleInfo'
import getWinnerIndex from 'weplay-events/pages/EventPage/helpers/getWinnerIndex'
import { participantPropType } from 'weplay-events/customPropTypes'

import styles from './styles.scss'

const Header = ({
  onClose,
  backgroundUrl,
  match,
  participants,
}) => {
  const t = useTranslation()

  const participantA = participants[0]
  const participantB = participants[1]
  const winnerIndex = getWinnerIndex(participantA.score, participantB.score)

  return (
    <div className={styles.block}>
      <BackgroundFullWidth
        className={styles.background}
        src={backgroundUrl}
        alt="Match details"
      />

      <span
        className={styles.close}
        onClick={onClose}
      >
        <Icon
          className={styles.icon}
          iconName="close"
        />
      </span>

      <span
        className={classNames(
          styles.label,
          { [styles.isLive]: match?.status === 'active' },
        )}
      >
        {t(`events.matchDetails.${match.status}`)}
      </span>

      <div className={styles.wrapScore}>
        <span className={styles.score}>
          {winnerIndex === 0 && (
            <Icon
              className={styles.iconWinner}
              iconName="cup"
            />
          )}

          {participantA.score ?? '-'}
        </span>
        :
        <span className={styles.score}>
          {participantB.score ?? '-'}

          {winnerIndex === 1 && (
            <Icon
              className={styles.iconWinner}
              iconName="cup"
            />
          )}
        </span>
      </div>

      <div className={styles.wrapName}>
        <div className={styles.participant}>
          <UserAvatar
            avatar={participantA.logo}
            className={styles.avatar}
            size="40"
          />

          <span className={styles.nickname}>{participantA.name || 'TBD'}</span>
        </div>

        <span className={styles.divider}>-</span>

        <div className={styles.participant}>
          <UserAvatar
            avatar={participantB.logo}
            className={styles.avatar}
            size="40"
          />

          <span className={styles.nickname}>{participantB.name || 'TBD'}</span>
        </div>
      </div>

      <div className={styles.description}>
        <MatchSubtitleInfo
          match={match}
          withDateTime
        />
      </div>
    </div>
  )
}

Header.propTypes = {
  onClose: PropTypes.func.isRequired,
  backgroundUrl: PropTypes.shape({}).isRequired,
  participants: PropTypes.arrayOf(
    participantPropType,
  ).isRequired,
  match: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

export default Header
