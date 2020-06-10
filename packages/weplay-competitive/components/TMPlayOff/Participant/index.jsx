import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import SvgIcon from 'weplay-components/SvgIcon'

import TournamentUser from '../TournamentUser'

import styles from './styles.scss'
import container from './container'

const Participant = ({
  // required props
  participant,

  // container props
  iconName,
  winnerIconBlock,
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
  isTechnicalDefeated,

  // optional props
  isWinner,
  isGameSheduled,
  className,
  isCurrentUser,
}) => (
  <div
    className={classNames(
      styles.participant,
      className,
      {
        [styles.winner]: isWinner,
        [styles.isHovered]: isHovered,
        // TODO: @Roman Bogdanov plz add current user
        [styles.isCurrentUser]: isCurrentUser,
      },
    )}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <TournamentUser
      participant={participant}
      isHovered={isHovered}
    />
    <div className={styles.wrapper}>
      {isTechnicalDefeated && (
        <div className={styles.icon}>
          <Icon
            className={styles.iconSkull}
            iconName="skull"
          />
        </div>
      )}
      <div className={styles.score}>
        {isGameSheduled ? '-' : participant.score}
      </div>
      {winnerIconBlock && (
        <div className={styles.icon}>
          <SvgIcon
            className={styles.iconCup}
            iconName={iconName}
            type="color"
          />
        </div>
      )}
    </div>
  </div>
)

Participant.propTypes = {
  // required props
  participant: PropTypes.shape({
    uuid: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,

  // props from container
  iconName: PropTypes.string.isRequired,
  winnerIconBlock: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isTechnicalDefeated: PropTypes.bool.isRequired,

  // optional props
  isWinner: PropTypes.bool,
  isGameSheduled: PropTypes.bool,
  className: PropTypes.string,
  isCurrentUser: PropTypes.bool,
}

Participant.defaultProps = {
  isWinner: false,
  isGameSheduled: false,
  className: '',
  isCurrentUser: false,
}


export default container(Participant)
