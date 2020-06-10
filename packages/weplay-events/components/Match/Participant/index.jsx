import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import BetProviderCoefficient from '../BetProviderCoefficient'
import DefaultPlayer from '../DefaultPlayer'

import styles from './styles.scss'

const Participant = ({
  // required props
  participant,

  // container props
  betProvider,

  // optional props
  isWinner,
  isDisqualified,
  isLiveTournament,
  nickname,
  score,
  coefficient,
  gameUrl,
}) => (
  <div className={classNames(
    styles.participant,
    { [styles.isWinner]: isWinner },
  )}
  >
    <DefaultPlayer
      participant={participant}
      nickname={nickname}
    />

    {/* TODO: @frontend Will need this */}
    {/* {(!coefficient && isWinner) && ( */}
    {/*  <Icon */}
    {/*    iconName="cup" */}
    {/*    className={styles.winnerIcon} */}
    {/*  /> */}
    {/* )} */}

    {(!coefficient && isDisqualified) && (
      // TODO: @frontend Statement to render disqualified
      <Icon
        iconName="game"
        className={styles.leaveIcon}
      />
    )}

    {(coefficient && isLiveTournament) && (
      <div className={classNames(
        styles.wrapHyphenCoefficient,
        styles[betProvider],
      )}
      >
        <BetProviderCoefficient
          gameUrl={gameUrl}
          coefficient={coefficient}
          className={styles.coefficient}
          betProvider=""
        />
      </div>
    )}

    <div className={styles.score}>
      {score ?? '-'}
    </div>
  </div>
)

Participant.propTypes = {
  // required props

  // props from container

  // optional props
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
  }),
  betProvider: PropTypes.string,
  coefficient: PropTypes.number,
  gameUrl: PropTypes.string,
  nickname: PropTypes.string,
  score: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isWinner: PropTypes.bool,
  isLiveTournament: PropTypes.bool,
  isDisqualified: PropTypes.bool,
}

Participant.defaultProps = {
  participant: {},
  coefficient: null,
  betProvider: '',
  gameUrl: '',
  nickname: '',
  score: '-',
  isWinner: false,
  isLiveTournament: false,
  isDisqualified: false,
}

export default Participant
