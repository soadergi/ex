import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'

const Scoreboard = ({
  // required props
  groups,
  isMobileWidth,

  // props from container

  // optional props
  isRoundRobinTournament,
  ScoreGroup,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.roundRobin]: isRoundRobinTournament },
  )}
  >
    {
      groups.map((group, index) => (
        <ScoreGroup
          key={index} // eslint-disable-line react/no-array-index-key
          games={group.games}
          name={group.name}
          collapsed={!isRoundRobinTournament && (index > 0 && isMobileWidth)}
        />
      ))
    }
  </div>
)

Scoreboard.propTypes = {
  // required props
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // props from container
  isMobileWidth: PropTypes.bool.isRequired,

  // optional props
  isRoundRobinTournament: PropTypes.bool,
  ScoreGroup: PropTypes.shape({}).isRequired,
}

Scoreboard.defaultProps = {
  isRoundRobinTournament: false,
}

export default container(Scoreboard)
