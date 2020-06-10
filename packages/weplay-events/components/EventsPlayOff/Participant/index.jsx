import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import CommonUser from 'weplay-components/PlayOffCommonUser'
import BetProviderPlayerCoefficient from 'weplay-events/components/BetProviderPlayerCoefficient'

import styles from './styles'
import container from './container'

const Participant = ({
  // required props
  participant,

  // container props
  hasCoefficient,
  iconName,
  winnerIconBlock,
  betProviderBlock,
  betProvider,
  isHovered,

  // optional props
  coefficient,
  isWinner,
  isGameSheduled,
  isInvited,
  gameUrl,
  hasDarkBackground,
  tournamentTitle,
  isParticipantFinal,

}) => (
  <div
    className={classNames(
      styles.participant,
      styles[tournamentTitle],
      {
        [styles.isParticipantFinal]: isParticipantFinal,
        [styles.winner]: isWinner,
        [styles.isFinalist]: winnerIconBlock,
        [styles.isHovered]: isHovered,
      },
    )}
  >
    {/* TODO: commented but may be needed later */}
    {/* {isInvited && ( */}
    {/*  <div className={styles.invitedTeamConnector}> */}
    {/*    <div className={styles.path} /> */}
    {/*  </div> */}
    {/* )} */}

    <CommonUser
      participant={participant}
      isInvited={isInvited}
      hasDarkBackground={hasDarkBackground}
    />

    <div className={styles.score}>
      {isGameSheduled ? '-' : participant.score}
    </div>

    {winnerIconBlock && (
      <div className={styles.finalist}>

        <SvgIcon
          className={styles.iconCup}
          iconName={iconName}
          type="color"
        />
      </div>
    )}

    {betProviderBlock && (
      <div className={classNames(
        styles.wrapHyphenCoefficient,
        styles[betProvider],
      )}
      >
        {hasCoefficient ? (
          <BetProviderPlayerCoefficient
            gameUrl={gameUrl}
            coefficient={coefficient}
            className={styles.coefficient}
          />
        ) : (
          <span className={classNames(
            styles.hyphenCoefficient,
          )}
          >
            {'-'}
          </span>
        )}
      </div>
    )}
  </div>
)

Participant.propTypes = {
  // required props
  isParticipantFinal: PropTypes.bool.isRequired,
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,

  // props from container
  betProvider: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  winnerIconBlock: PropTypes.bool.isRequired,
  betProviderBlock: PropTypes.bool.isRequired,
  hasCoefficient: PropTypes.bool.isRequired,

  // optional props
  isHovered: PropTypes.bool,
  coefficient: PropTypes.number,
  gameUrl: PropTypes.string,
  isWinner: PropTypes.bool,
  isGameSheduled: PropTypes.bool,
  isInvited: PropTypes.bool,
  hasDarkBackground: PropTypes.bool,
  tournamentTitle: PropTypes.string,
}

Participant.defaultProps = {
  isHovered: false,
  coefficient: null,
  gameUrl: '',
  isWinner: false,
  isGameSheduled: false,
  isInvited: false,
  hasDarkBackground: false,
  tournamentTitle: '',
}


export default container(Participant)
