import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import Avatar from 'weplay-components/Avatar'

import BetProviderPlayerCoefficient from '../../../BetProviderPlayerCoefficient'

import styles from './participant.scss'
import container from './container'

const Participant = ({
  // required props
  participant,
  i18nTexts,
  isTournamentFinished,

  // optional props
  coefficient,
  isWinner,
  isParticipantFinal,
  isGameSheduled,
  isInvited,
  gameUrl,
}) => (
  <div className={classNames(
    styles.participant,
    {
      [styles.winner]: isWinner,
      [styles.hasAvatar]: isTournamentFinished,
    },
  )}
  >
    <div className={styles.user}>
      {isParticipantFinal && (
        <div className={styles.finalist}>
          <SvgIcon
            iconName={isWinner ? 'goldCup' : 'silverCup'}
            type="color"
          />
        </div>
      )}

      <div className={styles.userAvatar}>
        {isTournamentFinished && (
          <Avatar
            avatar={participant.picture}
            className={styles.avatar}
          />
        )}

        {(isInvited && !isParticipantFinal && participant.nickname) && (
          <div className={styles.invited}>
            <SvgIcon
              iconName="gold-star"
              type="color"
            />
          </div>
        )}
      </div>

      <span className={classNames(
        styles.name,
        {
          [styles.isActive]: !R.isNil(participant.nickname),
          'u-text-medium': isInvited && participant.nickname,
        },
      )}
      >
        {participant.nickname || i18nTexts.tba}
      </span>
    </div>

    <div className={styles.data}>
      {!R.isNil(participant.nickname) && !R.isNil(coefficient) && !isTournamentFinished && (
        <BetProviderPlayerCoefficient
          gameUrl={gameUrl}
          coefficient={coefficient}
        />
      )}

      <div className={styles.score}>
        {isGameSheduled ? '-' : participant.score}
      </div>
    </div>
  </div>
)

Participant.propTypes = {
  // required props
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
    picture: PropTypes.string,
    nickname: PropTypes.string,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,

  // optional props
  coefficient: PropTypes.number,
  gameUrl: PropTypes.string,
  isWinner: PropTypes.bool,
  isGameSheduled: PropTypes.bool,
  isParticipantFinal: PropTypes.bool,
  isInvited: PropTypes.bool,
}

Participant.defaultProps = {
  coefficient: null,
  gameUrl: '',
  isWinner: false,
  isGameSheduled: false,
  isParticipantFinal: false,
  isInvited: false,
}

export default container(Participant)
