import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import BetProviderCoefficient from '../BetProviderCoefficient'
import DefaultPlayer from '../DefaultPlayer'

import styles from './styles.scss'

const ScheduleParticipant = ({
  participant,
  betProvider,
  isWinner,
  gameUrl,
  isMatchFinished,
}) => (
  <div className={styles.block}>
    <DefaultPlayer
      participant={participant}
      nickname={participant.name || 'TBD'}
    />

    {isWinner && (
      <Icon
        iconName="cup"
        className={styles.winnerIcon}
      />
    )}

    {/* TODO: Use this when disqualified field on backend will be implemented */}
    {/* {(!participant.coefficient && (participant.winner || participant.disqualified)) && ( */}
    {/*  // TODO: @frontend Statement to render disqualified */}
    {/*  <Icon */}
    {/*    iconName={participant.winner ? 'cup' : 'skull'} */}
    {/*    className={classNames( */}
    {/*      styles.winnerIcon, */}
    {/*      { [styles.disqualifiedIcon]: participant.disqualified }, */}
    {/*    )} */}
    {/*  /> */}
    {/* )} */}

    {!isMatchFinished && Boolean(participant.coefficient) && (
      // TODO: @frontend Statement to render coefficient
      <div
        className={classNames(
          styles.wrapHyphenCoefficient,
          styles[betProvider],
        )}
      >
        <BetProviderCoefficient
          coefficient={participant.coefficient}
          className={styles.coefficient}
          gameUrl={gameUrl}
          betProvider="pariMatch" // TODO: fix hardCode
        />
      </div>
    )}

    <div
      className={classNames(
        styles.score,
        { [styles.isDisqualified]: participant.disqualified }, // TODO: Needs to be added on backend
      )}
    >
      {participant.score ?? '-'}
    </div>
  </div>
)

ScheduleParticipant.propTypes = {
  isMatchFinished: PropTypes.bool.isRequired,
  isWinner: PropTypes.bool.isRequired,
  participant: PropTypes.shape({
    coefficient: PropTypes.number,
    score: PropTypes.number,
    name: PropTypes.string,
    winner: PropTypes.string,
    disqualified: PropTypes.string,
  }),
  gameUrl: PropTypes.string,
  betProvider: PropTypes.string,
}

ScheduleParticipant.defaultProps = {
  participant: {},
  gameUrl: '',
  betProvider: '',
}

export default React.memo(ScheduleParticipant)
